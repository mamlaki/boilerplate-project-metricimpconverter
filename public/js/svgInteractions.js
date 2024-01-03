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
})