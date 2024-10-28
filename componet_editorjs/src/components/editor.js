import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import RawTool from '@editorjs/raw';

const EditorJsComponent = () => {
  const editorInstance = useRef(null);

  useEffect(() => {
    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: {
            class: Header,
            inlineToolbar: ['link'],
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: 'http://localhost:8008/uploadFile', // 你的文件上传接口
                byUrl: 'http://localhost:8008/fetchUrl', // 你的图片URL获取接口
              },
            },
          },
          raw: RawTool,
        },
      });
    }

    return () => {
      if (editorInstance.current && editorInstance.current.destroy) {
        editorInstance.current.destroy();
      }
    };
  }, []);

  return <div id="editorjs"></div>;
};

export default EditorJsComponent;