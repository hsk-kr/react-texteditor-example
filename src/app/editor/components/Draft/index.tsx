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
    <div className="h-24 flex gap-1 p-2 border-b-gray-800 border flex-wrap">
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
      <div className="flex-[1] disable-tailwind">
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </div>
  );
}
