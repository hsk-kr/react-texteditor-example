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
    format: Format;
  }

  interface BaseText {
    bold: boolean;
    italic: boolean;
    underline: boolean;
  }
}

type Format = (typeof format)[number];

type FormatType = 'block' | 'inline';

type NodeProperty = Partial<BaseElement> & { format: Format };

const initialValue: any = [
  {
    format: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
];

const blockFormat = [
  'header-one',
  'header-two',
  'header-three',

  'blockquote',
  'unordered-list-item',
  'ordered-list-item',
  'paragraph',
  'list-item',
] as const;

const markFormat = ['bold', 'italic', 'underline'] as const;

const format = [...blockFormat, ...markFormat] as const;

const tools: {
  label: string;
  format: Format;
  formatType: FormatType;
  isList?: boolean;
}[] = [
  {
    label: 'H1',
    format: 'header-one',
    formatType: 'block',
  },
  {
    label: 'H2',
    format: 'header-two',
    formatType: 'block',
  },
  {
    label: 'H3',
    format: 'header-three',
    formatType: 'block',
  },
  {
    label: 'Bold',
    format: 'bold',
    formatType: 'inline',
  },
  {
    label: 'Italic',
    format: 'italic',
    formatType: 'inline',
  },
  {
    label: 'Underline',
    format: 'underline',
    formatType: 'inline',
  },
  {
    label: 'Blockquote',
    format: 'blockquote',
    formatType: 'block',
  },
  {
    label: 'UL',
    format: 'unordered-list-item',
    formatType: 'block',
    isList: true,
  },
  {
    label: 'OL',
    format: 'ordered-list-item',
    formatType: 'block',
    isList: true,
  },
];

const LIST_TYPES = ['unordered-list-item', 'ordered-list-item'];

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
    if (tool.formatType === 'block') {
      const isActive = isBlockActive(tool.format);

      Transforms.unwrapNodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          LIST_TYPES.includes((n as NodeProperty).format),
        split: true,
      });

      const newProperties: NodeProperty = {
        format: isActive
          ? 'paragraph'
          : tool.isList
          ? 'list-item'
          : tool.format,
      };

      Transforms.setNodes<SlateElement>(editor, newProperties);

      if (!isActive && tool.isList) {
        const block = { format: tool.format, children: [] };
        Transforms.wrapNodes(editor, block);
      }
    } else {
      if (isMarkActive(tool.format)) {
        Editor.removeMark(editor, tool.format);
      } else {
        Editor.addMark(editor, tool.format, true);
      }
    }

    setTimeout(() => onToggle(tool), 0);
  };

  const isBlockActive = (format: Format) => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          (n as NodeProperty).format === format,
      })
    );

    return !!match;
  };

  const isMarkActive = (format: Format) => {
    const marks = Editor.marks(editor);
    return marks ? (marks as any)[format] === true : false;
  };

  return (
    <div className="min-h-12 max-h-24 flex gap-1 p-2 border-b-gray-800 border flex-wrap">
      {tools.map((tool) => {
        const active =
          tool.formatType === 'block'
            ? isBlockActive(tool.format)
            : isMarkActive(tool.format);

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
  switch (element.format) {
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

    const handleContentChange = () => {
      onChange(editor.innerHTML);
    };

    editor.addEventListener('keypress', handleContentChange);

    return () => {
      editor.removeEventListener('keypress', handleContentChange);
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
