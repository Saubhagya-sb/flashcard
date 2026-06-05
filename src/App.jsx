import { useState } from 'react'
import { questions } from './questions.js'
import './App.css'

const categories = [...new Set(questions.map(q => q.category))]

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const filtered = questions.filter(q => q.category === selectedCategory)
  const current = filtered[currentIndex]

  function selectCategory(cat) {
    setSelectedCategory(cat)
    setCurrentIndex(0)
    setFlipped(false)
  }

  function prev() {
    setCurrentIndex(i => Math.max(0, i - 1))
    setFlipped(false)
  }

  function next() {
    setCurrentIndex(i => Math.min(filtered.length - 1, i + 1))
    setFlipped(false)
  }

  function goTo(i) {
    setCurrentIndex(i)
    setFlipped(false)
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
          <span>Categories</span>
        </div>
        <ul className="category-list">
          {categories.map(cat => {
            const count = questions.filter(q => q.category === cat).length
            return (
              <li key={cat}>
                <button
                  className={`category-btn ${cat === selectedCategory ? 'active' : ''}`}
                  onClick={() => selectCategory(cat)}
                >
                  <span className="category-name">{cat}</span>
                  <span className="category-count">{count}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </aside>

      <main className="main-content">
        <div className="content-header">
          <div>
            <h1 className="content-title">{selectedCategory}</h1>
            <p className="content-subtitle">
              {filtered.length} question{filtered.length !== 1 ? 's' : ''} in this category
            </p>
          </div>
          <div className="progress-badge">
            {currentIndex + 1} <span>/ {filtered.length}</span>
          </div>
        </div>

        {current && (
          <div className="card-area">
            <div
              className="card-container"
              onClick={() => setFlipped(f => !f)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' || e.key === ' ' ? setFlipped(f => !f) : null}
              aria-label={flipped ? 'Click to see question' : 'Click to reveal answer'}
            >
              <div className={`card ${flipped ? 'flipped' : ''}`}>
                <div className="card-face card-front">
                  <div className="card-face-inner">
                    <span className="card-tag">Question</span>
                    <p className="card-question">{current.question}</p>
                  </div>
                  <div className="card-hint">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 2H3v16h5v4l4-4h5l4-4V2z"/>
                    </svg>
                    Click to reveal answer
                  </div>
                </div>

                <div className="card-face card-back">
                  <div className="card-face-inner">
                    <span className="card-tag answer-tag">Answer</span>
                    <p className="card-answer">{current.summary}</p>
                  </div>
                  <div className="card-hint">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0"/>
                      <path d="M12 8v4l3 3"/>
                    </svg>
                    Click to see question
                  </div>
                </div>
              </div>
            </div>

            <div className="navigation">
              <button
                className="nav-btn"
                onClick={prev}
                disabled={currentIndex === 0}
                aria-label="Previous question"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                Prev
              </button>

              <div className="dots">
                {Array.from({ length: Math.min(5, filtered.length) }, (_, i) => (
                  <button
                    key={i}
                    className={`dot ${i === currentIndex % 5 ? 'dot-active' : ''}`}
                    onClick={() => goTo(Math.floor(currentIndex / 5) * 5 + i)}
                    aria-label={`Go to question ${Math.floor(currentIndex / 5) * 5 + i + 1}`}
                  />
                ))}
              </div>

              <button
                className="nav-btn"
                onClick={next}
                disabled={currentIndex === filtered.length - 1}
                aria-label="Next question"
              >
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
