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
  // Open modal when icon is clicked.
  document.querySelectorAll('.hint-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      let modalId = icon.id.replace('icon', 'modal')
      document.getElementById(modalId).style.display = 'block'
    })
  })

  // Close modal when close button is clicked.
  document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', () => {
      button.parentElement.style.display = 'none'
    })
  })

  // Make modals draggable.
  document.querySelectorAll('.drag-icon').forEach(icon => {
    let modal = icon.closest('.info-popup')

    icon.addEventListener('mousedown', (event) => {
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
})