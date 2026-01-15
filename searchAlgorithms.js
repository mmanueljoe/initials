// === SEARCH ALGORITHMS


// linear search algorithm
function linearSearch(arr, target){
    if(arr.length === 0) return;

    
    for(let i = 0; i < arr.length; i++){
        
        if(arr[i] === target) return i;
    }

    return -1;
}



// binary search algorithm

function binarySearchMine(arr, target){

    if(arr.length === 0) return -1;

    const middle = arr.length / 2;
    console.log(middle);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    console.log(left);
    console.log(right);

    if(arr[middle] === target){
        return arr[middle];
    } else if (arr[middle] < target){
        for(let i = 0; i < left.length; i++){
            if(left[i] === target) return arr[i]; 
        }
    }else {
        for(let i = 0; i < right.length; i++){
            if(right[i] === target) return arr[i];
        }
    }

    return -1;
}

function binarySearch(arr, target){
    let leftIndex = 0;
    let rightIndex = arr.length - 1;


    while(leftIndex <= rightIndex){
        let middleIndex = Math.floor((leftIndex + rightIndex) / 2);


        if(target === arr[middleIndex]){
            return middleIndex;
        }
        
        if(target < arr[middleIndex]){
            rightIndex = middleIndex - 1;
        }else{
            leftIndex = middleIndex + 1;
        }
    }

    return -1;
}


// binary with recursion
function binarySearchWithRecursion(arr, target){

    if(arr.length === 0) return -1;

    let middleIndex = Math.floor(arr.length / 2);
    const left = arr.slice(0, middleIndex);
    const right = arr.slice(middleIndex + 1);

    if(target === arr[middleIndex]){
        return middleIndex;
    } 
    
    if(target < arr[middleIndex]){
        return binarySearchWithRecursion(left, target);
    }else {
        let result = binarySearchWithRecursion(right, target);
        return (middleIndex + 1) + result;
    }
}

// binary search using indices

function recursiveBinarySearch(arr, target){
    return search(arr, target, 0, arr.length - 1);
}


function search(arr, target, leftIndex, rightIndex){
    if(leftIndex > rightIndex){
        return -1;
    }

    let middleIndex = Math.floor((leftIndex + rightIndex) / 2);


    if(target === arr[middleIndex]) return middleIndex;

    if(target < arr[middleIndex]){
        return search(arr, target, leftIndex, middleIndex - 1);
    } else{
        return search(arr, target, middleIndex + 1, rightIndex);
    }
}

