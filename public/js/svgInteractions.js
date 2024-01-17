// Stop the breathing animation for ALL icons when one is hovered over.
const svgs = document.querySelectorAll('.title-w-icon svg')

svgs.forEach(svg => {
  svg.addEventListener('mouseenter', () => {
    svgs.forEach(svg => svg.style.animation = 'none')
  })

  svg.addEventListener('mouseleave', () => {
    svgs.forEach(svg => svg.style.animation = '')
  })
})

// Reveal the respective info modal when an icon is clicked.
document.addEventListener('DOMContentLoaded', () => {
  let openModals = []
  const BASE_Z_INDEX = 1000
  let highestZIndex = BASE_Z_INDEX

  const getNextHighestZIndex = () => highestZIndex++

  const repositionModal = (modal) => {
    let offset = 50
    let windowHeight = window.innerHeight
    let modalHeight = modal.offsetHeight

    if (openModals.length === 0) {
      modal.style.top = offset
    } else {
      let lastModal = openModals[openModals.length - 1]
      let lastModalRect = lastModal.getBoundingClientRect()

      let newTopBelow = lastModalRect.bottom + offset
      let newTopAbove = lastModalRect.top - modalHeight - offset

      if (newTopBelow + modalHeight <= windowHeight) {
        modal.style.top = newTopBelow + 'px'
      } else if (newTopAbove >= 0) {
        modal.style.top = newTopAbove + 'px'
      } else {
        modal.style.top = offset
      }
    }

    openModals.push(modal)
  }

  // Open modal when icon is clicked.
  document.querySelectorAll('.hint-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      let modalId = icon.id.replace('icon', 'modal')
      let modal = document.getElementById(modalId)
      if (modal.style.display !== 'block') {
        modal.style.display = 'block'
        repositionModal(modal)
      }
      modal.style.zIndex = getNextHighestZIndex()
    })
  })

  // Close modal when close button is clicked.
  document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', () => {
      let modal = button.closest('.info-popup')
      modal.style.display = 'none'
      openModals = openModals.filter(currentModal => currentModal !== modal)
      modal.style.left = ''
      modal.style.top = ''
    })
  })

  // Make modals draggable.
  document.querySelectorAll('.info-popup').forEach(modal => {
    // Move modal based on mouse position and viewport.
    const moveAt = (pageX, pageY, shiftX, shiftY) => {
      let modalRect = modal.getBoundingClientRect()
      let windowHeight = window.innerHeight

      let newTop = pageY - shiftY

      if (newTop < 0) newTop = 0
      if (newTop + modalRect.height > windowHeight) {
        newTop = windowHeight - modalRect.height
      }

      modal.style.left = pageX - shiftX + 'px'
      modal.style.top = newTop + 'px'
    }

    // Update modal position during drag.
    const onMouseMove = (event, shiftX, shiftY) => {
      moveAt(event.pageX, event.pageY, shiftX, shiftY)
    }

    // Modal can be dragged when either the drag icon is interacted with or when the modal itself is interacted with.
    modal.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('drag-icon') || event.target === modal) {
        document.body.style.userSelect = 'none'
        modal.style.zIndex = getNextHighestZIndex()

        let shiftX = event.clientX - modal.getBoundingClientRect().left
        let shiftY = event.clientY - modal.getBoundingClientRect().top

        const onMouseMoveBound = event => onMouseMove(event, shiftX, shiftY)

        moveAt(event.pageX, event.PageY, shiftX, shiftY)

        document.addEventListener('mousemove', onMouseMoveBound)

        const onMouseUp = () => {
          document.body.style.userSelect = ''
          document.removeEventListener('mousemove', onMouseMoveBound)
          document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mouseup', onMouseUp)

      }
    })

    // Prevent default browser drag behaviour for the modal.
    modal.ondragstart = () => false
  })
})