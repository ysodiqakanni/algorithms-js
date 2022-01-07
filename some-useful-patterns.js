function countUniqueValues1(numbers){
    if(!numbers || numbers.length < 1) return 0;

    var uniqueNums = [numbers[0]];
    let current = numbers[0];
    for(let num of numbers){
        if(num !== current){
            uniqueNums.push(num);
            current = num;
        }
    }
    return uniqueNums.length;
}

// using 2 pointer method
function countUniqueValues(numbers){
    if(!numbers || numbers.length < 1) return 0;

    let left = 0;
    let right = 1;
    let uniqueCount = 1;
    while(right < numbers.length){
        if(numbers[left] !== numbers[right]){
            uniqueCount++;
            left = right;
        }
        right++;
    }

    return uniqueCount; 
}

countUniqueValues([1,1,1,1,1,2]);  //2
countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]);  //7
countUniqueValues([]);  //0
countUniqueValues([-2,-1,-1,0,1]);  //4

// Write a function called sameFrequency Given two positive integers, find out if the two numbers have the same frequency of digits.
// eg: 182, 281 = true

function sameFrequency(n1, n2){
    if(!(!!n1 && !!n2) || n1.length !== n2.length){
        return false;
    }

    let s1 = n1.toString();
    let s2 = n2.toString();

    let freq1 = {};
    for(let char of s1){
        freq1[char] = (freq1[char] || 0) + 1;
    }

    let freq2 = {};
    for(let char of s2){
        if(!freq1[char]){
            return false;
        }
        freq2[char] = (freq2[char] || 0) + 1;
    }

    for(let key in freq1){
        if(freq1[key] !== freq2[key]){
            return false;
        }
    }

    return true;
}

sameFrequency(281, 182);

// accepts a variable number of arguments and checks if there are duplicates
function areThereDuplicates(){
    let checker = {};
    for(let val of arguments){
        if(checker[val]){
            return true;
        }
        else{
            checker[val] = 1;
        }
    }
    return false;
}

areThereDuplicates(1,2,3,4,0);

console.log("average pair::");
// given a sorted array of sorted integers and a target average, check if there is a pair of 
// values in the array where the average = the target average
// using sliding window pattern
function averagePair1(numbers, target){
    if(target.length < 2) return false;

    let left = 0;
    let right = 1;
    let movingSum = numbers[0] + numbers[1];
    for(let i = 1; i < numbers.length - 1; i++){
        movingSum = movingSum - numbers[i -1] + numbers[i + 1];
         if(movingSum / 2 === target) return true;
    }
    return false;
}

// using divide and conquer
function averagePair2(numbers, target){
    if(target.length < 2) return false;
    // if the target is +ve, the last number has to be greater than target
    if(target > 0 && numbers[numbers.length -1] < target) return false;
    if(target < 0 && numbers[0] > target) return false;

    answer = recurse(numbers);

    console.log("answer::", answer);
    return !!answer;

    function recurse(numbers){
        if(numbers.length < 2) return;

        // p1 is the divider
        // when there are 2 elements, manually set p1 to 0
        p1 = numbers.length == 2 ? 0 : Math.floor(numbers.length / 2);
        let avg = (numbers[p1] + numbers[p1+1]) /2;
        if(avg === target) return true;

        else if(avg > target){
            return false || recurse(numbers.splice(0, p1+1));
        }
        else{
            return false || recurse(numbers.splice(p1+1));
        }
    }
  

}
// formularized (smart one)
// Time O(1), Space O(1)
// this will ONLY work if the numbers have the sequence 1,2,3,4,5,...
// derived from (n + (n+1))/2 = avg
function averagePair(numbers, target){
    let start = (2*target - 1) / 2;
    let ind = numbers.indexOf(start);
    if(ind === -1) return false;

    if((start + numbers[ind + 1]) / 2 === target) return true;

    else return false;
}
averagePair([1,2,3], 2.5)

console.log("isSubsequent");

// checks if the xters in the first str forms a subsequence of xters in the 2nd
// this function checks for consequtiveness eg: "hell", "hello wo" is true but "hell", "hebll" is false
function isSubsequent1(subStr, mainStr){ 
    // sample: "hello world", "hello"
    
    let left = 0;
    let right = 0
    for(i = 0; i<mainStr.length; i++){
        if(mainStr[i] === subStr[right]){
            right++;
        }
        else{
            // start allover and check for a possible substring
            right = 0;
        }
        if(right === subStr.length) return true;
    }

    return false;
}

// without consequtiveness
function isSubsequent(subStr, mainStr){ 
    // sample: "hello world", "hello"
    
    let left = 0;
    let right = 0
    for(i = 0; i<mainStr.length; i++){
        if(mainStr[i] === subStr[right]){
            right++;
        }
        else{ // this else is useless but deliberately left
            // do nothing, just continue to see if there's a possible check
        }
        if(right === subStr.length) return true;
    }

    return false;
}

isSubsequent("hello", "hello world");

console.log("maxSubarraySum")
// finds the max sum of subarray with the length of the number passed in
// the subarray must consist of consequtive elements from the original array

function maxSubarraySum(arr, length){
    if(!arr || length < 1 || arr.length < length) return null;
    // get the initial sum
    
    let movingSum = 0;
    for(let i =0; i< length; i++){
        movingSum += arr[i];
    }
    let maxSum = movingSum;
    
    for(let i = length; i<arr.length; i++){
        movingSum = movingSum - arr[i-length] + arr[i];
        if(movingSum > maxSum) 
        {
            maxSum = movingSum;
        }
    }

    return maxSum;
}
maxSubarraySum([100, 200, 300, 400], 2)


console.log("minSubArrayLen")
function minSubArrayLen(arr, num){
    let minCount = Infinity;
    let sum = 0;
    let totalCount = 0;
    for(let i = 0; i< arr.length; i++){
        sum += arr[i];
        totalCount++;

        //let totalCount = minCount;
        if(sum >= num && totalCount < minCount){
            minCount = totalCount;
            totalCount = 0;
            sum = arr[i];
        } 
    }
    return minCount;
}
minSubArrayLen([1,4,16,22,5,7,8,9,10], 55)

console.log("BUBBLE SORT")
/// Bubble sort algorithm 
// say you have an array [3,2,53,2,3,4]
// loop through the array and for each element, swap with the next ele if next is lower

function bubbleSort(arr){
    // for efficiency, stop the loop when there's no more swaps
    let swaps = true;
    for(let i=0; i<arr.length-1; i++){ 
        swaps = false;
        for(let j=0; j<arr.length-1; j++){
            if(arr[j] > arr[j + 1]){
                // swap 
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                swaps = true;
            }
        }

        if(swaps === false) break;

    }
    console.log("sorted array: ", arr);
}

bubbleSort([2,5,1,4,11,2,34,0,43,3])


console.log("SELECTION SORT");
// loop through each element and swap the element with the smallest value (if any smaller value is found)

function selectionSort(arr){
    for(let i = 0; i<arr.length; i++){
        let minInd = i;
        for(let j=i+1; j<arr.length; j++){
            if(arr[minInd] > arr[j]){
                minInd = j;
            }
        }
        if(i !== minInd){
            // swap
            swap(arr, i, minInd);
        }
    }
    return arr;
}

selectionSort([2,5,1,4,11,2,34,0,43,3])

function swap(arr, i,j){
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// INSERTION SORT
console.log("Now treating insertion sort...");
// [4,1,3,8,2,45,23]

function insertionSort(arr){
    console.log("insertion sort:::", arr);
    for(let i = 1; i< arr.length; i++){
        let currentVal = arr[i];
        let pos = i;
        for(let j = i-1; j>=0 && arr[j] > currentVal; j--){
            if(currentVal <= arr[j]){
                arr[j+1] = arr[j];
                pos = j;
                console.log(arr)
            }  
        } 
        arr[pos] = currentVal;
    }
    return arr;
}

insertionSort([4,1,3,8,2,45,23])


// MERGE 2 arrays
// Original author: Sodiq Yusuff
console.log("merging 2 sorted arrays");
// eg [2,7,8,9] and [3,4,10,12,13,22]

// m1: [2]
// m2: [2,3,7]

function merge(arr1, arr2){ 
    let right = 0; // for arr2
    let merged = [];

    let loopCounter = 0;
    for(let i = 0; i<arr1.length; i++){
        if(arr1[i] <= arr2[right]){
            merged.push(arr1[i]);

            loopCounter++;
        }
        else{ 
            while(arr1[i] > arr2[right] && right < arr2.length){ // also check for infinte loop
                merged.push(arr2[right]);
                right++;

                loopCounter++;
            }
            merged.push(arr1[i]);
            
        }
    }

    // right should get to ar2.length -1 for all right elements to be in the merged
    if(right < arr2.length -1){
        merged = merged.concat(arr2.splice(right));
    }

    //console.log("iterations:", loopCounter)
    return merged;
}

//merge([2,7,8,9], [3,4,10,12,13,22])

function merge1(arr1, arr2){
    console.log("merging", arr1, arr2)
    let results = [];
    let i = 0;
    let j = 0;
    while(i < arr1.length && j < arr2.length){
        if(arr2[j] > arr1[i]){
            results.push(arr1[i]);
            i++;
        }
        else{
            results.push(arr2[j]);
            j++;
        }
    }
    while(i < arr1.length){
        results.push(arr1[i]);
        i++;
    }
    while(j < arr2.length){
        results.push(arr2[j]);
        j++;
    }

    return results;
}

function mergeSort(arr){
    if(!arr || arr.length <= 1) return arr;
    let mid = Math.floor(arr.length/2);
    let left = mergeSort(arr.slice(0,mid));
    let right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

//console.log("Merge sort result: ",mergeSort([2,44,2,4,67,554,34,56,44,0,9]))
console.log("Merge sort result: ",mergeSort([10,24,76,73]))
