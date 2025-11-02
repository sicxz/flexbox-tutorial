// ===== Tutorial Interactive Features =====
// State management, progress tracking, validations, and UI interactions

// Initialize state
const TutorialState = {
  completedSteps: new Set(),
  reflections: {},
  currentStep: null,
  autoPreview: false,
};

// ===== LocalStorage Management =====
const Storage = {
  KEYS: {
    COMPLETED: 'flexbox-tutorial-completed',
    REFLECTIONS: 'flexbox-tutorial-reflections',
    HTML_CODE: 'flexbox-tutorial-html',
    CSS_CODE: 'flexbox-tutorial-css',
  },

  load() {
    try {
      const completed = localStorage.getItem(this.KEYS.COMPLETED);
      if (completed) {
        TutorialState.completedSteps = new Set(JSON.parse(completed));
      }

      const reflections = localStorage.getItem(this.KEYS.REFLECTIONS);
      if (reflections) {
        TutorialState.reflections = JSON.parse(reflections);
      }

      const htmlCode = localStorage.getItem(this.KEYS.HTML_CODE);
      if (htmlCode) {
        document.getElementById('htmlEditor').value = htmlCode;
      }

      const cssCode = localStorage.getItem(this.KEYS.CSS_CODE);
      if (cssCode) {
        document.getElementById('cssEditor').value = cssCode;
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  },

  save() {
    try {
      localStorage.setItem(
        this.KEYS.COMPLETED,
        JSON.stringify([...TutorialState.completedSteps])
      );
      localStorage.setItem(
        this.KEYS.REFLECTIONS,
        JSON.stringify(TutorialState.reflections)
      );
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  saveCode() {
    try {
      const htmlCode = document.getElementById('htmlEditor').value;
      const cssCode = document.getElementById('cssEditor').value;
      localStorage.setItem(this.KEYS.HTML_CODE, htmlCode);
      localStorage.setItem(this.KEYS.CSS_CODE, cssCode);
    } catch (error) {
      console.error('Error saving code:', error);
    }
  },

  clear() {
    try {
      Object.values(this.KEYS).forEach(key => localStorage.removeItem(key));
      TutorialState.completedSteps.clear();
      TutorialState.reflections = {};
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};

// ===== Progress Tracking =====
const Progress = {
  TOTAL_STEPS: 6, // Parts A-F

  update() {
    const completed = TutorialState.completedSteps.size;
    const percentage = Math.round((completed / this.TOTAL_STEPS) * 100);

    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    if (progressFill) {
      progressFill.style.width = `${percentage}%`;
    }

    if (progressText) {
      progressText.textContent = `${percentage}% Complete (${completed}/${this.TOTAL_STEPS})`;
    }

    // Update step status indicators
    TutorialState.completedSteps.forEach(step => {
      const statusEl = document.querySelector(`.step-status[data-step="${step}"]`);
      if (statusEl) {
        statusEl.classList.add('completed');
        statusEl.classList.remove('in-progress');
      }
    });
  },

  markComplete(step) {
    TutorialState.completedSteps.add(step);
    Storage.save();
    this.update();
  },

  markInProgress(step) {
    const statusEl = document.querySelector(`.step-status[data-step="${step}"]`);
    if (statusEl && !TutorialState.completedSteps.has(step)) {
      statusEl.classList.add('in-progress');
    }
  },
};

// ===== Accordion Sections =====
const Accordion = {
  init() {
    const headers = document.querySelectorAll('.section-header[data-section]');

    headers.forEach(header => {
      header.addEventListener('click', () => {
        const isExpanded = header.classList.contains('expanded');

        if (isExpanded) {
          header.classList.remove('expanded');
        } else {
          // Collapse all other sections
          headers.forEach(h => h.classList.remove('expanded'));
          // Expand clicked section
          header.classList.add('expanded');

          // Mark as in progress
          const step = header.dataset.section;
          Progress.markInProgress(step);
        }
      });
    });

    // Auto-expand first section
    const firstHeader = document.querySelector('.section-header[data-section="a"]');
    if (firstHeader) {
      firstHeader.classList.add('expanded');
    }
  },
};

// ===== Solution Toggles =====
const Solutions = {
  init() {
    const toggleButtons = document.querySelectorAll('.btn-toggle-solution');

    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const solutionId = button.dataset.solution;
        const solutionBox = document.getElementById(solutionId);

        if (solutionBox) {
          const isHidden = solutionBox.classList.contains('hidden');

          if (isHidden) {
            solutionBox.classList.remove('hidden');
            button.textContent = '🔒 Hide Solution';
          } else {
            solutionBox.classList.add('hidden');
            button.textContent = '💡 Show Solution';
          }
        }
      });
    });
  },
};

// ===== Checkpoint Validation =====
const Checkpoints = {
  validators: {
    a: {
      name: 'Part A: HTML Scaffold',
      validate() {
        return {
          passed: true,
          message: '✓ Great start! Make sure you have 5 nav items with matching section IDs, and a .deco element in each section.',
        };
      },
    },
    b: {
      name: 'Part B: Flexbox Layout',
      validate() {
        return {
          passed: true,
          message: '✓ Nice work on the layout! Remember: sidebar should be 300px with flex: 0 0 300px, and content should use flex: 1 1 auto.',
        };
      },
    },
    c: {
      name: 'Part C: Sticky Sidebar',
      validate() {
        return {
          passed: true,
          message: '✓ Excellent! Your sidebar should now stick to the viewport. Test by scrolling to make sure it stays in place.',
        };
      },
    },
    d: {
      name: 'Part D: Anchor Links',
      validate() {
        return {
          passed: true,
          message: '✓ Perfect! Your anchor links should smoothly scroll to each section. Check that scroll-margin-top gives good spacing.',
        };
      },
    },
    e: {
      name: 'Part E: Decorative Elements',
      validate() {
        return {
          passed: true,
          message: '✓ Beautiful! Your decorative elements should be visible but not interfere with text or clicks (pointer-events: none).',
        };
      },
    },
    f: {
      name: 'Part F: Finishing Touches',
      validate() {
        return {
          passed: true,
          message: '✓ Outstanding work! You\'ve completed all the main requirements. Don\'t forget the optional enhancements!',
        };
      },
    },
  },

  init() {
    const validateButtons = document.querySelectorAll('.validate-checkpoint');

    validateButtons.forEach(button => {
      button.addEventListener('click', () => {
        const step = button.dataset.step;
        this.validate(step);
      });
    });
  },

  validate(step) {
    const validator = this.validators[step];
    if (!validator) return;

    const result = validator.validate();
    const feedbackEl = document.querySelector(
      `.checkpoint[data-checkpoint="${step}"] .checkpoint-feedback`
    );

    if (feedbackEl) {
      feedbackEl.classList.remove('hidden', 'success', 'info');
      feedbackEl.classList.add(result.passed ? 'success' : 'info');
      feedbackEl.textContent = result.message;

      if (result.passed) {
        Progress.markComplete(step);

        // Add confetti effect or celebration
        this.celebrate(step);
      }
    }
  },

  celebrate(step) {
    // Simple celebration animation
    const feedbackEl = document.querySelector(
      `.checkpoint[data-checkpoint="${step}"] .checkpoint-feedback`
    );

    if (feedbackEl) {
      feedbackEl.style.animation = 'none';
      setTimeout(() => {
        feedbackEl.style.animation = 'pulse 0.5s ease';
      }, 10);
    }
  },
};

// ===== Reflections =====
const Reflections = {
  init() {
    const saveButtons = document.querySelectorAll('.save-reflection');

    saveButtons.forEach(button => {
      button.addEventListener('click', () => {
        const step = button.dataset.step;
        this.save(step);
      });
    });

    // Load saved reflections
    this.loadAll();

    // Copy all reflections button
    const copyButton = document.getElementById('copyReflections');
    if (copyButton) {
      copyButton.addEventListener('click', () => this.copyAll());
    }
  },

  save(step) {
    const textarea = document.querySelector(`.reflection-input[data-step="${step}"]`);
    if (!textarea) return;

    const content = textarea.value.trim();
    if (!content) {
      alert('Please write a reflection before saving.');
      return;
    }

    TutorialState.reflections[step] = content;
    Storage.save();

    // Visual feedback
    textarea.classList.add('saved');
    setTimeout(() => textarea.classList.remove('saved'), 2000);

    // Update button text temporarily
    const button = document.querySelector(`.save-reflection[data-step="${step}"]`);
    if (button) {
      const originalText = button.textContent;
      button.textContent = '✓ Saved!';
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    }
  },

  loadAll() {
    Object.entries(TutorialState.reflections).forEach(([step, content]) => {
      const textarea = document.querySelector(`.reflection-input[data-step="${step}"]`);
      if (textarea) {
        textarea.value = content;
      }
    });
  },

  copyAll() {
    const steps = ['a', 'b', 'c', 'd', 'e', 'f'];
    const labels = {
      a: 'Part A: HTML Scaffold',
      b: 'Part B: Flexbox Layout',
      c: 'Part C: Sticky Sidebar',
      d: 'Part D: Anchor Links',
      e: 'Part E: Decorative Elements',
      f: 'Part F: Finishing Touches',
    };

    let text = '# Flexbox Tutorial Reflections\n\n';

    steps.forEach(step => {
      const reflection = TutorialState.reflections[step];
      if (reflection) {
        text += `## ${labels[step]}\n${reflection}\n\n`;
      }
    });

    // Copy to clipboard
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('All reflections copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        // Fallback: show in alert
        alert(text);
      });
  },
};

// ===== Live Code Editor =====
const CodeEditor = {
  autoPreviewTimeout: null,

  init() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const editors = document.querySelectorAll('.code-editor');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const editorType = button.dataset.editor;

        // Update tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Update editors
        editors.forEach(editor => {
          editor.classList.remove('active');
        });
        document.getElementById(`${editorType}Editor`).classList.add('active');
      });
    });

    // Update preview button
    const updateButton = document.getElementById('updatePreview');
    if (updateButton) {
      updateButton.addEventListener('click', () => this.updatePreview());
    }

    // Auto-preview toggle
    const autoPreviewCheckbox = document.getElementById('autoPreview');
    if (autoPreviewCheckbox) {
      autoPreviewCheckbox.addEventListener('change', e => {
        TutorialState.autoPreview = e.target.checked;
      });
    }

    // Auto-save code on input
    const htmlEditor = document.getElementById('htmlEditor');
    const cssEditor = document.getElementById('cssEditor');

    [htmlEditor, cssEditor].forEach(editor => {
      editor.addEventListener('input', () => {
        Storage.saveCode();

        // Auto-preview if enabled
        if (TutorialState.autoPreview) {
          clearTimeout(this.autoPreviewTimeout);
          this.autoPreviewTimeout = setTimeout(() => {
            this.updatePreview();
          }, 1000);
        }
      });
    });

    // Download button
    const downloadButton = document.getElementById('downloadCode');
    if (downloadButton) {
      downloadButton.addEventListener('click', () => this.downloadFiles());
    }

    // Load saved code
    Storage.load();
  },

  updatePreview() {
    const htmlCode = document.getElementById('htmlEditor').value;
    const cssCode = document.getElementById('cssEditor').value;
    const previewFrame = document.getElementById('preview');

    if (!previewFrame) return;

    const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;

    const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <style>
    ${cssCode}
  </style>
</head>
<body>
  ${htmlCode}
</body>
</html>
    `;

    previewDoc.open();
    previewDoc.write(fullHTML);
    previewDoc.close();
  },

  downloadFiles() {
    const htmlCode = document.getElementById('htmlEditor').value;
    const cssCode = document.getElementById('cssEditor').value;

    if (!htmlCode && !cssCode) {
      alert('Please write some code first!');
      return;
    }

    // Download HTML
    if (htmlCode) {
      this.downloadFile('index.html', htmlCode);
    }

    // Download CSS
    if (cssCode) {
      this.downloadFile('styles.css', cssCode);
    }

    alert('Files downloaded! Check your Downloads folder.');
  },

  downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },
};

// ===== Smooth Scroll Navigation =====
const Navigation = {
  init() {
    const navLinks = document.querySelectorAll('.step-list a[data-step]');

    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          // Expand the section
          const header = targetSection.querySelector('.section-header');
          if (header) {
            const allHeaders = document.querySelectorAll('.section-header[data-section]');
            allHeaders.forEach(h => h.classList.remove('expanded'));
            header.classList.add('expanded');
          }

          // Scroll to section
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });

          // Mark as in progress
          const step = link.dataset.step;
          Progress.markInProgress(step);
        }
      });
    });
  },
};

// ===== Reset Progress =====
const Reset = {
  init() {
    const resetButton = document.getElementById('clearProgress');
    if (resetButton) {
      resetButton.addEventListener('click', () => this.confirm());
    }
  },

  confirm() {
    const confirmed = confirm(
      'Are you sure you want to reset all progress? This will clear:\n\n' +
        '• Completed steps\n' +
        '• Saved reflections\n' +
        '• Saved code\n\n' +
        'This cannot be undone.'
    );

    if (confirmed) {
      Storage.clear();

      // Clear UI
      document.querySelectorAll('.step-status').forEach(status => {
        status.classList.remove('completed', 'in-progress');
      });

      document.querySelectorAll('.reflection-input').forEach(input => {
        input.value = '';
      });

      document.getElementById('htmlEditor').value = '';
      document.getElementById('cssEditor').value = '';

      document.querySelectorAll('.checkpoint-feedback').forEach(feedback => {
        feedback.classList.add('hidden');
      });

      Progress.update();

      alert('Progress reset successfully!');
    }
  },
};

// ===== Keyboard Shortcuts =====
const Shortcuts = {
  init() {
    document.addEventListener('keydown', e => {
      // Ctrl/Cmd + Enter to update preview
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        CodeEditor.updatePreview();
      }

      // Ctrl/Cmd + S to save code (prevent default browser save)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        Storage.saveCode();
        this.showToast('Code saved!');
      }
    });
  },

  showToast(message) {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #1e293b;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  },
};

// ===== Add CSS animations =====
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎓 Interactive Flexbox Tutorial loaded!');

  // Load saved state
  Storage.load();

  // Initialize all modules
  Accordion.init();
  Solutions.init();
  Checkpoints.init();
  Reflections.init();
  CodeEditor.init();
  Navigation.init();
  Reset.init();
  Shortcuts.init();

  // Update progress display
  Progress.update();

  console.log('✓ All features initialized');
  console.log('Keyboard shortcuts: Ctrl/Cmd+Enter = Update Preview, Ctrl/Cmd+S = Save Code');
});

// Auto-save before leaving
window.addEventListener('beforeunload', () => {
  Storage.save();
  Storage.saveCode();
});
