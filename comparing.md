I never made my own text editor before, and the idea seemed tough. Even with some experience working on projects with editors, the thought of creating one from scratch was a bit overwhelming.

Recently, I had to deal with a text editor for a project. To figure things out, I did some research. In this article, I'm sharing what I learned and the code for different text editor libraries.

You can try out the [Demo](https://hsk-kr.github.io/react-texteditor-example/) here.

---

Here are the things I looked for in text editors:

- It should work well with React.
- It must be free to use for commercial purposes.
- It needs to function well on mobile web browsers.

As I was working on a mobile web application, having good compatibility with mobile browsers was crucial. Interestingly, it wasn't necessary for the libraries to offer specific `React` components, but they simply served as a `React` component.

**(2024. 12. 09)**

| Name                                                    | Github Star | Github Issues | Github Pull Requests | Weekly Downloads(npm) |
| ------------------------------------------------------- | ----------- | ------------- | -------------------- | --------------------- |
| [Draft.js](https://github.com/facebookarchive/draft-js) | 22.5k       | 797           | 159                  | 844,458               |
| [quill](https://github.com/quilljs/quill)               | 37.6k       | 1.3k          | 74                   | 1,216,684             |
| [react-quill](https://github.com/zenoamaro/react-quill) | 6.2k        | 315           | 22                   | 486,193               |
| [slate](https://github.com/ianstormtaylor/slate)        | 28.3k       | 609           | 24                   | 665,800               |

---

## Draft.js

![Draft Demo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rxbw5i9spbrs9jx3123z.png)

**Full code**

```typescript
'use client';

import { useEffect, useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'draft-js/dist/Draft.css';
import './styles.css';

interface DraftProps {
  onChange: (html: string) => void;
}

interface ToolButtonProps {
  label: string;
  active: boolean;
  onToggle: VoidFunction;
}

interface ToolsProps {
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
}

const tools = [
  {
    label: 'H1',
    style: 'header-one',
    styleType: 'block',
  },
  {
    label: 'H2',
    style: 'header-two',
    styleType: 'block',
  },
  {
    label: 'H3',
    style: 'header-three',
    styleType: 'block',
  },
  {
    label: 'Bold',
    style: 'BOLD',
    styleType: 'inline',
  },
  {
    label: 'Italic',
    style: 'ITALIC',
    styleType: 'inline',
  },
  {
    label: 'Underline',
    style: 'UNDERLINE',
    styleType: 'inline',
  },
  {
    label: 'Blockquote',
    style: 'blockquote',
    styleType: 'block',
  },
  {
    label: 'UL',
    style: 'unordered-list-item',
    styleType: 'block',
  },
  {
    label: 'OL',
    style: 'ordered-list-item',
    styleType: 'block',
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

const Tools = ({ editorState, onEditorStateChange }: ToolsProps) => {
  const handleToggle = (tool: (typeof tools)[0]) => () => {
    let newEditorState;
    if (tool.styleType === 'block') {
      newEditorState = RichUtils.toggleBlockType(editorState, tool.style);
    } else {
      newEditorState = RichUtils.toggleInlineStyle(editorState, tool.style);
    }

    onEditorStateChange(newEditorState);
  };

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="min-h-12 max-h-24 flex gap-1 p-2 border-b-gray-800 border flex-wrap">
      {tools.map((tool) => {
        const active =
          tool.styleType === 'block'
            ? blockType === tool.style
            : currentStyle.has(tool.style);

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

export default function Draft({ onChange }: DraftProps) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    const raw = convertToRaw(editorState.getCurrentContent());
    const html = draftToHtml(raw);
    onChange(html);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorState]);

  return (
    <div className="h-full flex flex-col">
      <Tools editorState={editorState} onEditorStateChange={setEditorState} />
      <div className="h-[0] min-h-[0] flex-[1] disable-tailwind overflow-y-auto">
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </div>
  );
}
```

It offers all the essential features you would expect from a text editor right from the start. What you need to do is to implement a toolbar.

However, there's a crucial issue. I should have read the documentation thoroughly before diving into the library.

On Github :

> THIS PROJECT IS CURRENTLY IN MAINTENANCE MODE. It will not receive any feature updates, only critical security bug patches. On 31st December 2022 the repo will be fully archived.

Yes. This library is no longer active anymore. Even though it appeared working smoothly. There are some issues like toggle features and typing not working on mobile browsers.

The repository mentioned that the package lacks full support for mobile browsers, specifically iOS Safari and Chrome for Android.

Despite its ease of use and a high number of installations, I decided to exclude it from my list due to concerns about stability and mobile support.

---

## Quill

![Quill Demo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zi4a2su5fb8ow04jpqvr.png)

**Full Code**

```typescript
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles.css';

interface QuillProps {
  onChange: (html: string) => void;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
];

export default function Quill({ onChange }: QuillProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      modules={modules}
      formats={formats}
    />
  );
}
```

I'm not certain if [react-quill](https://github.com/zenoamaro/react-quill) is an official library or not though, it's a widely-used React component library.

It comes with an embedded toolbar, and you have the option to choose from officially supported themes like Snow or Bubble. You can set up a powerful rich text editor in just a minute.

According to the [repository](https://github.com/quilljs/quill), the library boasts remarkable compatibility and extensibility.

---

## Slate React

![Slate React Demo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kzvs3fvnsqzq4m3kvqwm.png)

**Full Code**

```typescript
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
```

> Before creating Slate, I tried a lot of the other rich text libraries out there—Draft.js, Prosemirror, Quill, etc. What I found was that while getting simple examples to work was easy enough, once you started trying to build something like Medium, Dropbox Paper or Google Docs, you ran into deeper issues... - [In the slate github repository](https://github.com/ianstormtaylor/slate)

This tool gives you everything you need to create your own text editor.

To be honest, understanding it may be a bit tricky at first. But, if you put in some effort to learn, making a cool and complex text editor becomes way easier than starting from scratch.

Before moving on, I first will share an error that I faced while trying out an example code.

> Uncaught Error: Cannot get the start point in the node at path [] because it has no start text node.

```typescript
<Slate editor={editor} initialValue={[]}>

// You need to make a starting point.

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

<Slate editor={editor} initialValue={initialValue}>
```

I thought using an empty array for the `initialValue` property would be fine, but it caused an error. It took me a while to figure out that I needed to provide a starting point by passing the `initialValue` prop.

As this tool has a learning curve, I will break down some parts of the code for a better understanding.

### Element and Leaf

There are two rendering types: `Element` and `Leaf`. Think of `Element` as a block style and `Leaf` as an inline style.

To display these, you have to create rendering components.

```typescript
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

// ...

const renderElement = useCallback(
  (props: RenderElementProps) => <Element {...props} />,
  []
);
const renderLeaf = useCallback(
  (props: RenderLeafProps) => <Leaf {...props} />,
  []
);

<Editable renderElement={renderElement} renderLeaf={renderLeaf} />;
```

### Check which styles are applied

```typescript
// Create Editor Object
const [editor] = useState(() => withReact(createEditor()));

// Types

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

type Type = (typeof types)[number];

// Is[*]Active

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
```

`type` is one of the styles you have defined such as `paragraph`, `bold`, and so on.

The functions `isBlockActive` and `isMarkActive` are what I just brought from [an example](https://github.com/ianstormtaylor/slate/blob/main/site/examples/richtext.tsx) on [Github](https://github.com/ianstormtaylor/slate).

Since I didn't fully understand how each function and logic worked, I can't provide more details about the code. From my perspective, it appears that [the documentation](https://docs.slatejs.org/) lacks explanations for certain parts.

To keep track of active toggles for a current node, I forcefully updated when the `mousedown` and `keydown` events were fired.

```typescript
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
```

However, I don't consider this a good approach for tracking them. In a real project, You may need to implement it differently.

### Toggle

```typescript
// toggle types
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

// toggle function
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
```

What I want to clarify about this code is how `ol` and `ul` are generated with `li`,. as it was confusing for me.

The process goes with the following steps:

1. Unwrap Nodes.
2. If the type is a list - `ol` or `ul`, set `type` to `list-item` which will turn into `li`.
3. Wrap Nodes with the type - `ol` or `li`.

To trigger the `onToggle` event after toggling, I wrapped the call within a `setTimeout` function.

### Export as HTML

Despite following the guidance in the [document](https://docs.slatejs.org/v/v0.47/walkthroughs/saving-and-loading-html-content) to use `slate-plain-serializer` for exporting contented as HTML, it didn't work as expected. Others faced the same issue. In the end, I resorted to retrieving the HTML code from the `innerHTML` attribute of the editor element.

```typescript
const editor =
  containerRef.current?.querySelector<HTMLDivElement>('[role=textbox]');
if (!editor) return;

const handleContentChange = () => {
  onChange(editor.innerHTML);
};
```

---

## Wrap Up

Considering my brief experience with each library, there might be more efficient ways to use them.

My suggestion is that if you're aiming for a rich text editor with standard features and want to implement it effortlessly, then `Quill` could be the ideal choice. On the other hand, if you have the time to learn and plan to create a complex rich text editor like `Medium`, `Google Docs`, then `slate` might be a better option for you.

I hope you found it helpful.

Happy coding!

---

Github Repository: [Demo Code](https://github.com/hsk-kr/react-texteditor-example)
