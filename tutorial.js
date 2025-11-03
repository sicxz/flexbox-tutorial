// ===== Streamlined Tutorial Interactive Features =====
// Simple state management, progress tracking, and reflections

// Initialize state
const TutorialState = {
  completedSteps: new Set(),
  reflections: {},
};

// ===== LocalStorage Management =====
const Storage = {
  KEYS: {
    COMPLETED: 'flexbox-tutorial-completed',
    REFLECTIONS: 'flexbox-tutorial-reflections',
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
  },

  toggle(step) {
    if (TutorialState.completedSteps.has(step)) {
      TutorialState.completedSteps.delete(step);
    } else {
      TutorialState.completedSteps.add(step);
    }
    Storage.save();
    this.update();
  },
};

// ===== Section Checkboxes =====
const SectionCheckboxes = {
  init() {
    const checkboxes = document.querySelectorAll('.section-checkbox');

    checkboxes.forEach(checkbox => {
      const step = checkbox.dataset.step;

      // Load saved state
      if (TutorialState.completedSteps.has(step)) {
        checkbox.checked = true;
      }

      // Handle changes
      checkbox.addEventListener('change', () => {
        Progress.toggle(step);
      });
    });
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

// ===== Reflections =====
const Reflections = {
  init() {
    const saveButtons = document.querySelectorAll('.btn-save-reflection');

    saveButtons.forEach(button => {
      button.addEventListener('click', () => {
        const step = button.dataset.step;
        this.save(step);
      });
    });

    // Load saved reflections
    this.loadAll();

    // Auto-save on input (debounced)
    const textareas = document.querySelectorAll('.reflection-input');
    textareas.forEach(textarea => {
      let timeout;
      textarea.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          const step = textarea.dataset.step;
          const content = textarea.value.trim();
          if (content) {
            TutorialState.reflections[step] = content;
            Storage.save();
          }
        }, 1000);
      });
    });

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
    const button = document.querySelector(`.btn-save-reflection[data-step="${step}"]`);
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
      e: 'Part E: Decorative Icons',
      f: 'Part F: Finishing Touches',
    };

    let text = '<!--\n';
    text += '═══════════════════════════════════════════════\n';
    text += '  FLEXBOX TUTORIAL REFLECTIONS\n';
    text += '═══════════════════════════════════════════════\n\n';

    steps.forEach(step => {
      const reflection = TutorialState.reflections[step];
      if (reflection) {
        text += `${labels[step]}\n`;
        text += '─────────────────────────────────────────────\n';
        text += `${reflection}\n\n`;
      }
    });

    text += '═══════════════════════════════════════════════\n';
    text += '-->';

    if (text === '<!--\n═══════════════════════════════════════════════\n  FLEXBOX TUTORIAL REFLECTIONS\n═══════════════════════════════════════════════\n\n═══════════════════════════════════════════════\n-->') {
      alert('No reflections to copy yet. Write some reflections first!');
      return;
    }

    // Copy to clipboard
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('All reflections copied as HTML comment! Paste at the bottom of your HTML file.');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        // Fallback: show in alert
        prompt('Copy this text:', text);
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
        '• Saved reflections\n\n' +
        'This cannot be undone.'
    );

    if (confirmed) {
      Storage.clear();

      // Clear UI
      document.querySelectorAll('.section-checkbox').forEach(checkbox => {
        checkbox.checked = false;
      });

      document.querySelectorAll('.reflection-input').forEach(input => {
        input.value = '';
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
      // Ctrl/Cmd + S to save reflections (prevent default browser save)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        Storage.save();
        this.showToast('Progress saved!');
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

    // Add CSS animations if not already added
    if (!document.getElementById('toast-styles')) {
      const style = document.createElement('style');
      style.id = 'toast-styles';
      style.textContent = `
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
    }

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  },
};

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎓 Interactive Flexbox Tutorial loaded!');

  // Load saved state
  Storage.load();

  // Initialize all modules
  SectionCheckboxes.init();
  Solutions.init();
  Reflections.init();
  Reset.init();
  Shortcuts.init();

  // Update progress display
  Progress.update();

  console.log('✓ All features initialized');
  console.log('Keyboard shortcut: Ctrl/Cmd+S = Save Progress');
});

// Auto-save before leaving
window.addEventListener('beforeunload', () => {
  Storage.save();
});
