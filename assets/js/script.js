let expression = ""
const textarea = document.querySelector("#expression")

const body = document.querySelector("body")

const operations = ["+", "-", "*", "/", "."]

const updateTextarea = () => {
  expression = String(expression)
  if (expression == Infinity) {
    expression = ""
  }
  textarea.value = expression
}

const addDigit = (value) => {

  if(value == "Enter" || value == "=") {
    const result = eval(expression)
    expression = result
    updateTextarea()
    return
  }

  operations.forEach((operation) => {
    if (value == operation) {
      if (operation == ".") {
        let lastNumber = expression
        operations.forEach((operation) => {
          if (operation == ".") return
          lastNumber = lastNumber.split(operation).reverse()[0]
        })
        lastNumber += "."
        if (lastNumber.indexOf(".") != lastNumber.lastIndexOf(".")) {
          value = ""
        }
      }
      const lastLetter = expression.slice(-1)
      if (Number(lastLetter) || lastLetter === "0") {
        expression += value
        updateTextarea()
        return
      }
    }
  })

  if (Number(value)) {
    expression += value
    updateTextarea()
    return
  }

  if (value === "0") {
    if (expression.slice(-1) == "0") {
      return
    }
    expression += value
    updateTextarea()
  }

}

body.onkeydown = (event) => {
  if (event.key == "Backspace") {
    if (event.ctrlKey) {
      expression = ""
      updateTextarea()
      return
    }
    expression = expression.substring(0, expression.length - 1)
    updateTextarea()
    return
  }
  addDigit(event.key)
}

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (event) => {
    addDigit(event.target.innerText)
  })
  button.addEventListener("keydown", (event) => {
    event.preventDefault()
  })
})

