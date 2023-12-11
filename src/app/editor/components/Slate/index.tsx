import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  createEditor,
  Element as SlateElement,
  Transforms,
  Editor,
  BaseElement,
} from 'slate';
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react';

interface SlateProps {
  onChange: (html: string) => void;
}

interface ToolButtonProps {
  label: string;
  active: boolean;
  onToggle: VoidFunction;
}

interface ToolsProps {
  editor: Editor;
  onToggle: (tool: (typeof tools)[0]) => void;
}

declare module 'slate' {
  interface BaseElement {
    type: Type;
  }

  interface BaseText {
    bold: boolean;
    italic: boolean;
    underline: boolean;
  }
}

type Type = (typeof types)[number];

type TypeStyle = 'block' | 'inline';

type NodeProperty = Partial<BaseElement> & { type: Type };

const initialValue: any = [
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
];

const blockTypes = [
  'header-one',
  'header-two',
  'header-three',
  'blockquote',
  'unordered-list-item',
  'ordered-list-item',
  'paragraph',
  'list-item',
] as const;

const markTypes = ['bold', 'italic', 'underline'] as const;

const types = [...blockTypes, ...markTypes] as const;

const tools: {
  label: string;
  type: Type;
  style: TypeStyle;
  isList?: boolean;
}[] = [
  {
    label: 'H1',
    type: 'header-one',
    style: 'block',
  },
  {
    label: 'H2',
    type: 'header-two',
    style: 'block',
  },
  {
    label: 'H3',
    type: 'header-three',
    style: 'block',
  },
  {
    label: 'Bold',
    type: 'bold',
    style: 'inline',
  },
  {
    label: 'Italic',
    type: 'italic',
    style: 'inline',
  },
  {
    label: 'Underline',
    type: 'underline',
    style: 'inline',
  },
  {
    label: 'Blockquote',
    type: 'blockquote',
    style: 'block',
  },
  {
    label: 'UL',
    type: 'unordered-list-item',
    style: 'block',
    isList: true,
  },
  {
    label: 'OL',
    type: 'ordered-list-item',
    style: 'block',
    isList: true,
  },
];

const ToolButton = ({ label, active, onToggle }: ToolButtonProps) => {
  return (
    <button
      type="button"
      className={`text-gray-500 text-sm p-1 hover:text-secondary hover:font-bold ${
        active ? 'text-secondary font-bold' : ''
      }`}
      onClick={onToggle}
    >
      {label}
    </button>
  );
};

const Tools = ({ editor, onToggle }: ToolsProps) => {
  const handleToggle = (tool: (typeof tools)[0]) => () => {
    if (tool.style === 'block') {
      const isActive = isBlockActive(tool.type);

      Transforms.unwrapNodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          tools.find((tool) => tool.type === n.type)?.isList === true,
        split: true,
      });

      const newProperties: NodeProperty = {
        type: isActive ? 'paragraph' : tool.isList ? 'list-item' : tool.type,
      };

      Transforms.setNodes<SlateElement>(editor, newProperties);

      if (!isActive && tool.isList) {
        const block = { type: tool.type, children: [] };
        Transforms.wrapNodes(editor, block);
      }
    } else {
      if (isMarkActive(tool.type)) {
        Editor.removeMark(editor, tool.type);
      } else {
        Editor.addMark(editor, tool.type, true);
      }
    }

    setTimeout(() => onToggle(tool), 0);
  };

  const isBlockActive = (type: Type) => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          (n as NodeProperty).type === type,
      })
    );

    return !!match;
  };

  const isMarkActive = (type: Type) => {
    const marks = Editor.marks(editor);
    return marks ? (marks as any)[type] === true : false;
  };

  return (
    <div className="min-h-12 max-h-24 flex gap-1 p-2 border-b-gray-800 border flex-wrap">
      {tools.map((tool) => {
        const active =
          tool.style === 'block'
            ? isBlockActive(tool.type)
            : isMarkActive(tool.type);

        return (
          <ToolButton
            key={tool.label}
            label={tool.label}
            active={active}
            onToggle={handleToggle(tool)}
          />
        );
      })}
    </div>
  );
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const Element = ({ attributes, children, element }: RenderElementProps) => {
  switch (element.type) {
    case 'blockquote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'unordered-list-item':
      return <ul {...attributes}>{children}</ul>;
    case 'header-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'header-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'header-three':
      return <h3 {...attributes}>{children}</h3>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'ordered-list-item':
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default function SlateComp({ onChange }: SlateProps) {
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );
  const [_, forceUpdate] = useState(false);
  const [editor] = useState(() => withReact(createEditor()));
  const containerRef = useRef<HTMLDivElement>(null);

  const saveCurrentHtml = () => {
    const editor =
      containerRef.current?.querySelector<HTMLDivElement>('[role=textbox]');
    if (!editor) return;

    editor.dispatchEvent(new KeyboardEvent('keypress'));
  };

  useEffect(() => {
    const editor =
      containerRef.current?.querySelector<HTMLDivElement>('[role=textbox]');
    if (!editor) return;

    const _forceUpdate = () => forceUpdate((v) => !v);

    const handleContentChange = () => {
      onChange(editor.innerHTML);
    };

    editor.addEventListener('keyup', handleContentChange);
    editor.addEventListener('mousedown', _forceUpdate);
    editor.addEventListener('keydown', _forceUpdate);

    return () => {
      editor.removeEventListener('keyup', handleContentChange);
      editor.removeEventListener('mousedown', _forceUpdate);
      editor.removeEventListener('keydown', _forceUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full flex flex-col" ref={containerRef}>
      <Slate editor={editor} initialValue={initialValue}>
        <Tools editor={editor} onToggle={saveCurrentHtml} />
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          className="h-[0] min-h-[0] flex-[1] disable-tailwind overflow-y-auto p-4"
        />
      </Slate>
    </div>
  );
}
