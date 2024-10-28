// try.js
import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import CodePreviewToggle from './CodePreviewToggle';

const EditorComponent = () => {
  const editorInstance = useRef(null);

  useEffect(() => {
    // 初始化 Editor.js 实例
    editorInstance.current = new EditorJS({
      holder: 'editorjs',
      tools: {
        codePreview: {
          class: CodePreviewToggle,
        },
      },
    });
  }, []);

  return (
    <div>
      <div id="editorjs" style={{  padding: '10px' }}></div>
    </div>
  );
};

export default EditorComponent;
