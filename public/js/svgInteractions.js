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
    let lastModal = openModals[openModals.length - 1]

    if (lastModal) {
      let rect = lastModal.getBoundingClientRect()
      modal.style.top = rect.bottom + offset + 'px'
    } else {
      modal.style.top = ''
    }

    openModals.push(modal)
  }

  // Open modal when icon is clicked.
  document.querySelectorAll('.hint-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      let modalId = icon.id.replace('icon', 'modal')
      let modal = document.getElementById(modalId)
      modal.style.display = 'block'
      repositionModal(modal)
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
  document.querySelectorAll('.drag-icon').forEach(icon => {
    let modal = icon.closest('.info-popup')

    icon.addEventListener('mousedown', (event) => {
      modal.style.zIndex = getNextHighestZIndex()
      let shiftX = event.clientX - modal.getBoundingClientRect().left
      let shiftY = event.clientY - modal.getBoundingClientRect().top

      const moveAt = (pageX, pageY) => {
        modal.style.left = pageX - shiftX + 'px'
        modal.style.top = pageY - shiftY + 'px'
      }

      const onMouseMove = (event) => {
        moveAt(event.pageX, event.pageY)
      }

      moveAt(event.pageX, event.pageY)

      document.addEventListener('mousemove', onMouseMove)

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }

      document.addEventListener('mouseup', onMouseUp)
    })

    icon.ondragstart = () => false
  })

  document.querySelectorAll('.info-popup').forEach(popup => {
    popup.addEventListener('click', () => {
      popup.style.zIndex = getNextHighestZIndex()
    }) 
  })
})