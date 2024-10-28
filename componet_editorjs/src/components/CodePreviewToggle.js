// CodePreviewToggle.js
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

class CodePreviewToggle {
  constructor({ data, api }) {
    this.api = api;
    this.data = {
      code: data.code || '',
      showCode: data.showCode ?? true,
    };
    this.wrapper = null;
    this.resultDiv = null;
    this.codeDiv = null;
  }

  static get toolbox() {
    return {
      title: 'Code Preview',
      icon: '<svg>...</svg>', // 添加适合的图标
    };
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('code-preview-wrapper');

    // 创建渲染结果区
    this.resultDiv = document.createElement('div');
    this.resultDiv.classList.add('code-preview-result');
    this.updatePreview(); // 初始渲染预览内容

    // 创建可编辑的代码块显示区
    this.codeDiv = document.createElement('div');
    this.codeDiv.classList.add('code-preview-code');
    this.codeDiv.contentEditable = true; // 设置为可编辑
    this.codeDiv.style.display = this.data.showCode ? 'block' : 'none';
    this.codeDiv.innerHTML = Prism.highlight(this.data.code, Prism.languages.html, 'html');

    // 添加输入事件监听器，实时更新代码和渲染结果
    this.codeDiv.addEventListener('input', (event) => {
      this.data.code = event.target.innerText;
      this.updatePreview();
    });

    // 切换显示按钮
    const toggleButton = document.createElement('button');
    toggleButton.innerText = '切换代码显示';
    toggleButton.addEventListener('click', () => {
      this.data.showCode = !this.data.showCode;
      this.codeDiv.style.display = this.data.showCode ? 'block' : 'none';
    });

    // 将元素添加到 wrapper
    this.wrapper.appendChild(this.resultDiv);
    this.wrapper.appendChild(toggleButton);
    this.wrapper.appendChild(this.codeDiv);

    return this.wrapper;
  }

  // 更新预览内容
  updatePreview() {
    if (this.resultDiv) {
      this.resultDiv.innerHTML = this.data.code; // 更新渲染结果
    }
  }

  save() {
    return {
      code: this.data.code,
      showCode: this.data.showCode,
    };
  }
}

export default CodePreviewToggle;
