const arrayContainer = document.getElementById('array-container');
const bubbleSortButton = document.getElementById('bubblesort');
const quickSortButton = document.getElementById('quicksort');
const mergeSortButton = document.getElementById('mergesort');
const insertionSortButton = document.getElementById('insertionsort');
const sizeChange = document.getElementById('size');
const refresh = document.getElementById('refresh');
/*===================================================================*/

var size = 5;
function generateArray(l = size) {
    const array = [];
    for (let i = 0; i < l; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    return array;
}


function renderArray(array) {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        bar.style.width = `${arrayContainer.clientWidth / array.length - 2}px`;

        const number = document.createElement('span');
        number.textContent = value;
        bar.appendChild(number);

        arrayContainer.appendChild(bar);
    });
}

function canvasSection() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "red";
    ctx.fillRect(10,20,10,10);

    ctx.fillStyle = "orange";
    ctx.fillRect(30, 20, 10, 10);

    ctx.fillStyle = "green";
    ctx.fillRect(10, 70, 10, 10);

    ctx.fillStyle = "blue";
    ctx.fillRect(10, 120, 10, 10);
    
    ctx.font = "20px Arial";
    const grd = ctx.createLinearGradient(0, 0, 200, 0);
    grd.addColorStop(0, "red");
    grd.addColorStop(0.5, "orange");
    grd.addColorStop(1, "red");
    ctx.fillStyle = grd;

    ctx.fillText("they are being compared", 50, 30);
    ctx.fillStyle = "black";
    // ctx.fillStyle = "green";
    ctx.fillText("resultent from each loop step", 30, 80);
    // ctx.fillStyle = "blue";
    ctx.fillText("initial state", 30, 130);
}

async function speedSelector() {
    return parseFloat(document.getElementById("speed").value) * 1000;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*==================================bubble=================================*/

async function bubbleSort() {
    bubbleSortButton.style.background = "pink";
    bubbleSortButton.disabled  = true;
    quickSortButton.disabled = true;
    mergeSortButton.disabled = true;
    insertionSortButton.disabled = true;
    sizeChange.disabled = true;
    refresh.disabled = true;

    const bars = document.querySelectorAll('.bar');
    const array = Array.from(bars).map(bar => parseInt(bar.style.height) / 3);
    let n = array.length;

    for (let i = 0; i < n - 1; i++) {
        
        for (let j = 0; j < n - i - 1; j++) {
            const speed = await speedSelector();
            bars[j].style.backgroundColor = 'red';
            
            bars[j + 1].style.backgroundColor = 'orange';
            await new Promise(resolve => setTimeout(resolve, speed));
            

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;
                bars[j].querySelector('span').textContent = array[j];
                bars[j + 1].querySelector('span').textContent = array[j + 1];
            }

            bars[j].style.backgroundColor = 'blue';
            bars[j + 1].style.backgroundColor = 'green';
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    }
    bubbleSortButton.style.background = null;
    bubbleSortButton.disabled = false;
    quickSortButton.disabled = false;
    mergeSortButton.disabled = false;
    insertionSortButton.disabled = false;
    sizeChange.disabled = false;
    refresh.disabled = false;
}

/*===================================================================*/

async function quickSortHelper(array, left, right) {
    if (left >= right) return;

    const pivotIndex = await partition(array, left, right);
    await Promise.all([
        quickSortHelper(array, left, pivotIndex - 1),
        quickSortHelper(array, pivotIndex + 1, right)
    ]);
}

async function partition(array, left, right) {
    const bars = document.querySelectorAll('.bar');
    const pivotValue = array[right];
    let pivotIndex = left;

    bars[right].style.backgroundColor = 'red';

    for (let i = left; i < right; i++) {
        bars[i].style.backgroundColor = 'orange';
        //const speed = parseFloat(document.getElementById('speed').value) * 1000;
        await sleep(await speedSelector());

        if (array[i] < pivotValue) {
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
            bars[i].style.height = `${array[i] * 3}px`;
            bars[pivotIndex].style.height = `${array[pivotIndex] * 3}px`;
            bars[i].querySelector('span').textContent = array[i];
            bars[pivotIndex].querySelector('span').textContent = array[pivotIndex];
            pivotIndex++;
        }

        bars[i].style.backgroundColor = 'blue';
    }

    [array[pivotIndex], array[right]] = [array[right], array[pivotIndex]];
    bars[pivotIndex].style.height = `${array[pivotIndex] * 3}px`;
    bars[right].style.height = `${array[right] * 3}px`;
    bars[pivotIndex].querySelector('span').textContent = array[pivotIndex];
    bars[right].querySelector('span').textContent = array[right];

    bars[right].style.backgroundColor = 'blue';
    bars[pivotIndex].style.backgroundColor = 'green';
    return pivotIndex;
}

async function quickSort() {
    quickSortButton.style.background = "pink";
    bubbleSortButton.disabled = true;
    quickSortButton.disabled = true;
    mergeSortButton.disabled = true;
    insertionSortButton.disabled = true;
    sizeChange.disabled = true;
    refresh.disabled = true;

    const bars = document.querySelectorAll('.bar');
    const array = Array.from(bars).map(bar => parseInt(bar.style.height) / 3);
    await quickSortHelper(array, 0, array.length - 1);

    quickSortButton.style.background = null;
    bubbleSortButton.disabled = false;
    quickSortButton.disabled = false;
    mergeSortButton.disabled = false;
    insertionSortButton.disabled = false;
    sizeChange.disabled = false;
    refresh.disabled = false;
}

/*===================================================================*/

async function mergeSort() {
    mergeSortButton.style.background = "pink";
    bubbleSortButton.disabled = true;
    quickSortButton.disabled = true;
    mergeSortButton.disabled = true;
    insertionSortButton.disabled = true;
    sizeChange.disabled = true;
    refresh.disabled = true;

    const bars = document.querySelectorAll('.bar');
    const array = Array.from(bars).map(bar => parseInt(bar.style.height) / 3);
    await mergeSortHelper(array, 0, array.length - 1);

    mergeSortButton.style.background = null;
    bubbleSortButton.disabled = false;
    quickSortButton.disabled = false;
    mergeSortButton.disabled = false;
    insertionSortButton.disabled = false;
    sizeChange.disabled = false;
    refresh.disabled = false;
}

async function mergeSortHelper(array, left, right) {
    if (left >= right) return;

    const middle = Math.floor((left + right) / 2);
    await mergeSortHelper(array, left, middle);
    await mergeSortHelper(array, middle + 1, right);
    await merge(array, left, middle, right);
}

async function merge(array, left, middle, right) {
    const bars = document.querySelectorAll('.bar');
    const leftArray = array.slice(left, middle + 1);
    const rightArray = array.slice(middle + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
        //const speed = parseFloat(document.getElementById('speed').value) * 1000;
        await sleep(await speedSelector());

        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            bars[k].style.height = `${array[k] * 3}px`;
            bars[k].querySelector('span').textContent = array[k];
            bars[k].style.backgroundColor = 'red';
            i++;
        } else {
            array[k] = rightArray[j];
            bars[k].style.height = `${array[k] * 3}px`;
            bars[k].querySelector('span').textContent = array[k];
            bars[k].style.backgroundColor = 'orange';
            j++;
        }

        k++;
    }

    while (i < leftArray.length) {
        //const speed = parseFloat(document.getElementById('speed').value) * 1000;
        await sleep(await speedSelector());

        array[k] = leftArray[i];
        bars[k].style.height = `${array[k] * 3}px`;
        bars[k].querySelector('span').textContent = array[k];
        bars[k].style.backgroundColor = 'red';
        i++;
        k++;
    }

    while (j < rightArray.length) {
        //const speed = parseFloat(document.getElementById('speed').value) * 1000;
        await sleep(await speedSelector());

        array[k] = rightArray[j];
        bars[k].style.height = `${array[k] * 3}px`;
        bars[k].querySelector('span').textContent = array[k];
        bars[k].style.backgroundColor = 'orange';
        j++;
        k++;
    }

    for (let i = left; i <= right; i++) {
        bars[i].style.backgroundColor = 'green';
        await sleep(await speedSelector());
        bars[i].style.backgroundColor = 'blue';
    }
}


/*===================================================================*/

async function insertionSort() {
    insertionSortButton.style.background = "pink";
    bubbleSortButton.disabled = true;
    quickSortButton.disabled = true;
    mergeSortButton.disabled = true;
    insertionSortButton.disabled = true;
    sizeChange.disabled = true;
    refresh.disabled = true;

    const bars = document.querySelectorAll('.bar');
    const array = Array.from(bars).map(bar => parseInt(bar.style.height) / 3);

    for (let i = 1; i < array.length; i++) {
        let j = i - 1;
        const key = array[i];
        bars[i].style.backgroundColor = 'red';

        //const speed = parseFloat(document.getElementById('speed').value) * 1000;
        await sleep(await speedSelector());

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            bars[j + 1].querySelector('span').textContent = array[j + 1];
            bars[j + 1].style.backgroundColor = 'orange';
            j--;

            await sleep(await speedSelector());
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;
        bars[j + 1].querySelector('span').textContent = key;
        bars[j + 1].style.backgroundColor = 'green';

        await sleep(await speedSelector());

        for (let k = 0; k <= i; k++) {
            bars[k].style.backgroundColor = 'blue';
        }
    }

    insertionSortButton.style.background = null;
    bubbleSortButton.disabled = false;
    quickSortButton.disabled = false;
    mergeSortButton.disabled = false;
    insertionSortButton.disabled = false;
    sizeChange.disabled = false;
    refresh.disabled = false;
}


/*===================================================================*/

document.getElementById('size').addEventListener('change', function() {
    size = parseInt(this.value);
    const array = generateArray(size);
    renderArray(array);
});

document.getElementById('refresh').addEventListener('click', () => {
    const array = generateArray(size);
    renderArray(array);
});


document.addEventListener('DOMContentLoaded', () => {
    canvasSection();
    const array = generateArray(size);
    renderArray(array);
});