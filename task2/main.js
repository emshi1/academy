"use strict";


function readFile(input) {
    let file = input.files[0];

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
        console.log(reader.result);
        parse(reader.result);
    };

    reader.onerror = function () {
        console.log(reader.error);
    };

}

function parse(file) {
    let value = JSON.parse(file);
    console.log(value);
    createElem(value);
}

function createElem(obj) {
    for (let key in obj) {
        switch (key) {
            case "fields":
                createFields(obj[key]);
                break;
            case "references":
                createRef(obj[key]);
                break;
            case "buttons":
                createButtons(obj[key]);
                break;
            default:
                break;
        }
    }
}

function createFields(obj) {
    for (let key in obj) {
        fFields((obj[key]));
    }
}

function fFields(obj) {
    let br = document.createElement('br');
    let myLabel = document.createElement('label');
    let myInput = document.createElement('input');
    let values = Object.values(obj);
    console.log(values);
    for (let i in values) {
        if (typeof (values[i]) == "string")
            myLabel.textContent = values[i];
        else {
            for (let key in values[i])
                myInput.setAttribute(key, (values[i])[key]);
        }
        parrent.appendChild(br);
    }
    myLabel.appendChild(myInput);
    parrent.appendChild(myLabel);
    parrent.appendChild(br);
}

function createRef(obj) {
    for (let key in obj)
        fRef(obj[key]);
}

function fRef(obj) {
    let myRef = document.createElement('a');
    let br = document.createElement('br');

    for (let key in obj) {
        if (key === "text")
            myRef.textContent = obj[key];
        else if (key === "input") {
            myRef = document.createElement('input');
            for (let i in obj[key])
                myRef.setAttribute(i, (obj[key])[i]);
        }
        else if (key === "ref")
            myRef.setAttribute("href", obj[key]);
        else if (key === "text without ref") {
            let textNode = document.createElement('span');
            textNode.textContent = obj[key];
            
            parrent.appendChild(textNode);
        }
        parrent.appendChild(br);
    }

    parrent.appendChild(myRef);
    
}

function createButtons(obj) {
    for (let key in obj)
        fButtons(obj[key]);
}

function fButtons(obj) {
    let br = document.createElement('br');
    let myButt = document.createElement('button');

    for (let key in obj) {
        if (key === "text")
            myButt.textContent = obj[key];
        else
            myButt.setAttribute(key, obj[key]);

         parrent.appendChild(br);
    }
    parrent.appendChild(myButt);
}
