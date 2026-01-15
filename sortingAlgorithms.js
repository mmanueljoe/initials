// === SORTING ALGORITHMS

// bubble sort algorithm
function bubbleSort(arr){

    if(arr.length === 0) return [];

    if(arr.length <= 1) return arr;

    let swapped;

    do{
        swapped = false;

        for(let i = 0; i < arr.length - 1; i++){
            if(arr[i] > arr[i + 1]){
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
    } while(swapped)


    return arr;
}

console.log(bubbleSort([2,-1,0,6,3,10]))  // [-1, 0, 2, 3, 6, 10]
console.log(bubbleSort([]))  // []
console.log(bubbleSort([2]))  // [-1, 0, 2, 3, 6, 10]


// insertion sort
function insertionSort(arr){
    for(let i = 1; i < arr.length; i++){
        let numberToInsert = arr[i];

        let j = i - 1; 
        while(j >= 0 &&  arr[j] > numberToInsert){
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j+1] = numberToInsert;
    }

    return arr;
}


console.log(insertionSort([-2,6,4,-1,0,7]));



// quick sort
function quickSort(arr){

    if(arr.length < 2) return arr;

    let pivot = arr[arr.length - 1];

    let left = [];
    let right = [];


    for(const element of arr){
        if(element < pivot){
            left.push(element);
        }else {
            right.push(element);
        }
    }

    return [...quickSort(left), pivot , ...quickSort(right)];
}


// merge sort
function mergeSort(arr){
    if(arr.length < 2) return arr;

    let mid = Math.floor(arr.length / 2);

    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid);

    return merge(mergeSort(leftArr), mergeSort(rightArr));
}

function merge(leftArr, rightArr){
    const sortedArr = [];

    while(leftArr.length && rightArr.length){
        if(leftArr[0] <= rightArr[0]){
            sortedArr.push(leftArr.shift());
        } else {
            sortedArr.push(rightArr.shift())
        }
    }

    return [...sortedArr, ...leftArr, ...rightArr];

}

console.log(mergeSort([2,3,4,-1,10,33,45,22]));