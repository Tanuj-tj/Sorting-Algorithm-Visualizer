class SortingVisualizer {
    constructor() {
        this.array = [];
        this.arrayContainer = document.getElementById('array-container');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.speedInput = document.getElementById('speed');
        this.sizeInput = document.getElementById('size');
        this.stepCount = document.getElementById('stepCount');
        this.comparisons = document.getElementById('comparisons');
        this.algorithmSelect = document.getElementById('algorithm');
        this.currentStepDisplay = document.getElementById('currentStep');
        this.codeDisplay = document.getElementById('codeDisplay');
        this.languageSelect = document.getElementById('language');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.stepBtn = document.getElementById('stepBtn');
        this.skipBtn = document.getElementById('skipBtn');
        this.customArrayBtn = document.getElementById('customArrayBtn');
        this.reversedArrayBtn = document.getElementById('reversedArrayBtn');
        this.nearlySortedBtn = document.getElementById('nearlySortedBtn');
        this.customArrayModal = document.getElementById('customArrayModal');
        this.confirmCustomArrayBtn = document.getElementById('confirmCustomArray');
        this.cancelCustomArrayBtn = document.getElementById('cancelCustomArray');
        
        this.isSorting = false;
        this.comparisonCount = 0;
        this.currentStep = 0;
        this.isPaused = false;
        this.isStepMode = false;
        this.resolveStep = null;
        
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        this.algorithmImplementations = {
            bubble: {
                javascript: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                [arr[j], arr[j + 1]] = 
                    [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
                python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
                java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap arr[j] and arr[j+1]
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
                cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
                rust: `fn bubble_sort<T: Ord>(arr: &mut [T]) {
    let n = arr.len();
    for i in 0..n-1 {
        for j in 0..n-i-1 {
            if arr[j] > arr[j + 1] {
                arr.swap(j, j + 1);
            }
        }
    }
}`
            },
            selection: {
                javascript: `function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    return arr;
}`,
                python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
                java: `public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            int temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
        }
    }
}`,
                cpp: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            swap(arr[i], arr[minIdx]);
        }
    }
}`,
                rust: `fn selection_sort<T: Ord>(arr: &mut [T]) {
    let n = arr.len();
    for i in 0..n-1 {
        let mut min_idx = i;
        for j in i+1..n {
            if arr[j] < arr[min_idx] {
                min_idx = j;
            }
        }
        if min_idx != i {
            arr.swap(i, min_idx);
        }
    }
}`
            },
            insertion: {
                javascript: `function insertionSort(arr) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}`,
                python: `def insertion_sort(arr):
    n = len(arr)
    for i in range(1, n):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
                java: `public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
                cpp: `void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
                rust: `fn insertion_sort<T>(arr: &mut [T])
where T: Ord + Copy {
    let n = arr.len();
    for i in 1..n {
        let key = arr[i];
        let mut j = i;
        while j > 0 && arr[j - 1] > key {
            arr[j] = arr[j - 1];
            j -= 1;
        }
        arr[j] = key;
    }
}`,
            },
            quick: {
                javascript: `function quickSort(arr, low, high) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = 
                [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = 
        [arr[high], arr[i + 1]];
    return i + 1;
}`,
                python: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
                java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

public static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
                cpp: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
                rust: `fn quick_sort<T: Ord>(arr: &mut [T], low: isize, high: isize) {
    if low < high {
        let pi = partition(arr, low, high);
        quick_sort(arr, low, pi - 1);
        quick_sort(arr, pi + 1, high);
    }
}

fn partition<T: Ord>(arr: &mut [T], low: isize, high: isize) -> isize {
    let pivot = arr[high];
    let mut i = low - 1;
    for j in low..high {
        if arr[j] < pivot {
            i += 1;
            arr.swap(i, j);
        }
    }
    arr.swap(i + 1, high);
    i + 1
}`,
            },
            merge: {
                javascript: `function mergeSort(arr, left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
    return arr;
}

function merge(arr, left, mid, right) {
    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    
    while (i < L.length && j < R.length) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < L.length) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    while (j < R.length) {
        arr[k] = R[j];
        j++;
        k++;
    }
}`,
                python: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        left_half = arr[:mid]
        right_half = arr[mid:]

        merge_sort(left_half)
        merge_sort(right_half)

        i = j = k = 0

        while i < len(left_half) and j < len(right_half):
            if left_half[i] < right_half[j]:
                arr[k] = left_half[i]
                i += 1
            else:
                arr[k] = right_half[j]
                j += 1
            k += 1

        while i < len(left_half):
            arr[k] = left_half[i]
            i += 1
            k += 1

        while j < len(right_half):
            arr[k] = right_half[j]
            j += 1
            k += 1

def merge(arr, left, mid, right):
    n1 = mid - left + 1
    n2 = right - mid
    L = arr[left:mid+1]
    R = arr[mid+1:right+1]
    
    i = j = 0
    k = left
    
    while i < n1 and j < n2:
        if L[i] <= R[j]:
            arr[k] = L[i]
            i += 1
        else:
            arr[k] = R[j]
            j += 1
        k += 1

    while i < n1:
        arr[k] = L[i]
        i += 1
        k += 1

    while j < n2:
        arr[k] = R[j]
        j += 1
        k += 1`,
                java: `public static void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = (left + right) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

public static void merge(int[] arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int[] L = new int[n1];
    int[] R = new int[n2];
    
    for (int i = 0; i < n1; i++) {
        L[i] = arr[left + i];
    }
    for (int j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j];
    }
    
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}`,
                cpp: `void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int L[n1], R[n2];
    
    for (int i = 0; i < n1; i++) {
        L[i] = arr[left + i];
    }
    for (int j = 0; j < n2; j++) {
        R[j] = arr[mid + 1 + j];
    }
    
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}`,
                rust: `fn merge_sort<T: Ord>(arr: &mut [T], left: isize, right: isize) {
    if left < right {
        let mid = left + (right - left) / 2;
        merge_sort(arr, left, mid);
        merge_sort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

fn merge<T: Ord>(arr: &mut [T], left: isize, mid: isize, right: isize) {
    let n1 = mid - left + 1;
    let n2 = right - mid;
    let mut L = arr[left as usize..(mid + 1) as usize].to_vec();
    let mut R = arr[(mid + 1) as usize..(right + 1) as usize].to_vec();
    
    let mut i = 0;
    let mut j = 0;
    let mut k = left;
    
    while i < n1 && j < n2 {
        if L[i as usize] <= R[j as usize] {
            arr[k as usize] = L[i as usize];
            i += 1;
        } else {
            arr[k as usize] = R[j as usize];
            j += 1;
        }
        k += 1;
    }
    
    while i < n1 {
        arr[k as usize] = L[i as usize];
        i += 1;
        k += 1;
    }
    
    while j < n2 {
        arr[k as usize] = R[j as usize];
        j += 1;
        k += 1;
    }
}`,
            },
        };

        this.algorithmExplanations = {
            bubble: "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
            selection: "Selection Sort divides the array into a sorted and unsorted region, repeatedly selecting the smallest element from the unsorted region.",
            insertion: "Insertion Sort builds the final sorted array one item at a time, by repeatedly inserting a new element into the sorted portion of the array.",
            quick: "Quick Sort uses a divide-and-conquer strategy, selecting a 'pivot' element and partitioning the array around it.",
            merge: "Merge Sort divides the array into smaller subarrays, sorts them, and then merges them back together."
        };

        this.stats = {
            totalComparisons: 0,
            totalSwaps: 0,
            timeElapsed: 0
        };

        this.complexityInfo = {
            bubble: {
                best: "O(n)",
                average: "O(n²)",
                worst: "O(n²)",
                space: "O(1)"
            },
            selection: {
                best: "O(n²)",
                average: "O(n²)",
                worst: "O(n²)",
                space: "O(1)"
            },
            insertion: {
                best: "O(n)",
                average: "O(n²)",
                worst: "O(n²)",
                space: "O(1)"
            },
            quick: {
                best: "O(n log n)",
                average: "O(n log n)",
                worst: "O(n²)",
                space: "O(log n)"
            },
            merge: {
                best: "O(n log n)",
                average: "O(n log n)",
                worst: "O(n log n)",
                space: "O(n)"
            }
        };

        this.initializeEventListeners();
        this.generateArray();
        this.updateAlgorithmInfo();
        this.updateCodeDisplay();
    }

    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.startSort());
        this.resetBtn.addEventListener('click', () => this.generateArray());
        this.sizeInput.addEventListener('input', () => this.generateArray());
        this.algorithmSelect.addEventListener('change', () => {
            this.updateCodeDisplay();
            this.updateAlgorithmInfo();
        });
        this.languageSelect.addEventListener('change', () => this.updateCodeDisplay());
        this.pauseBtn.addEventListener('click', () => this.togglePause());
        this.stepBtn.addEventListener('click', () => this.step());
        this.skipBtn.addEventListener('click', () => this.skipToEnd());
        
        this.customArrayBtn.addEventListener('click', () => this.showCustomArrayModal());
        this.reversedArrayBtn.addEventListener('click', () => this.generateReversedArray());
        this.nearlySortedBtn.addEventListener('click', () => this.generateNearlySortedArray());
        
        this.confirmCustomArrayBtn.addEventListener('click', () => this.handleCustomArray());
        this.cancelCustomArrayBtn.addEventListener('click', () => this.hideCustomArrayModal());
    }

    generateArray() {
        this.array = [];
        const size = parseInt(this.sizeInput.value);
        for (let i = 0; i < size; i++) {
            this.array.push(Math.floor(Math.random() * 90) + 10);
        }
        this.renderArray();
        this.resetCounters();
        this.startBtn.disabled = false;
    }

    resetCounters() {
        this.comparisonCount = 0;
        this.currentStep = 0;
        this.updateStatus();
    }

    updateStatus() {
        this.stepCount.textContent = `Step: ${this.currentStep}`;
        this.comparisons.textContent = `Comparisons: ${this.comparisonCount}`;
    }

    renderArray(comparing = [], swapping = []) {
        this.arrayContainer.innerHTML = '';
        const maxVal = Math.max(...this.array);
        
        this.array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.height = `${(value / maxVal) * 100}%`;
            
            if (comparing.includes(index)) {
                bar.classList.add('comparing');
            }
            if (swapping.includes(index)) {
                bar.classList.add('swapping');
            }
            
            this.arrayContainer.appendChild(bar);
        });
    }

    async startSort() {
        if (this.isSorting) return;
        
        this.isSorting = true;
        this.startBtn.disabled = true;
        this.sizeInput.disabled = true;
        
        const algorithm = this.algorithmSelect.value;
        switch (algorithm) {
            case 'bubble':
                await this.bubbleSort();
                break;
            case 'selection':
                await this.selectionSort();
                break;
            case 'insertion':
                await this.insertionSort();
                break;
            case 'quick':
                await this.quickSort(0, this.array.length - 1);
                break;
            case 'merge':
                await this.mergeSort(0, this.array.length - 1);
                break;
        }
        
        this.isSorting = false;
        this.startBtn.disabled = false;
        this.sizeInput.disabled = false;
        this.renderArray();
    }

    async bubbleSort() {
        const n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                this.updateCurrentStep(`Comparing elements at positions ${j} and ${j + 1}`);
                this.currentStep++;
                this.comparisonCount++;
                this.updateStatus();
                
                this.renderArray([j, j + 1]);
                await this.delay();
                
                if (this.array[j] > this.array[j + 1]) {
                    this.updateCurrentStep(`Swapping elements ${this.array[j]} and ${this.array[j + 1]}`);
                    this.renderArray([j, j + 1], [j, j + 1]);
                    await this.delay();
                    
                    [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
                    this.renderArray();
                    await this.delay();
                }
            }
            this.updateCurrentStep(`Completed pass ${i + 1}`);
        }
    }

    async selectionSort() {
        const n = this.array.length;
        
        for (let i = 0; i < n - 1; i++) {
            this.updateCurrentStep(`Finding minimum element for position ${i}`);
            let minIdx = i;
            
            for (let j = i + 1; j < n; j++) {
                this.updateCurrentStep(`Comparing ${this.array[minIdx]} with ${this.array[j]}`);
                this.currentStep++;
                this.comparisonCount++;
                this.updateStatus();
                
                this.renderArray([minIdx, j]);
                await this.delay();
                
                if (this.array[j] < this.array[minIdx]) {
                    minIdx = j;
                }
            }
            
            if (minIdx !== i) {
                this.updateCurrentStep(`Swapping ${this.array[i]} with ${this.array[minIdx]}`);
                this.renderArray([i, minIdx], [i, minIdx]);
                await this.delay();
                
                [this.array[i], this.array[minIdx]] = [this.array[minIdx], this.array[i]];
                this.renderArray();
                await this.delay();
            }
        }
    }

    async insertionSort() {
        const n = this.array.length;
        
        for (let i = 1; i < n; i++) {
            let key = this.array[i];
            let j = i - 1;
            
            this.renderArray([i]);
            await this.delay();
            
            while (j >= 0 && this.array[j] > key) {
                this.currentStep++;
                this.comparisonCount++;
                this.updateStatus();
                
                this.renderArray([j, j + 1], [j, j + 1]);
                await this.delay();
                
                this.array[j + 1] = this.array[j];
                j--;
            }
            
            this.array[j + 1] = key;
            this.renderArray();
            await this.delay();
        }
    }

    async quickSort(low, high) {
        if (low < high) {
            const pi = await this.partition(low, high);
            await this.quickSort(low, pi - 1);
            await this.quickSort(pi + 1, high);
        }
    }

    async partition(low, high) {
        const pivot = this.array[high];
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
            this.currentStep++;
            this.comparisonCount++;
            this.updateStatus();
            
            this.renderArray([j, high]);
            await this.delay();
            
            if (this.array[j] < pivot) {
                i++;
                this.renderArray([i, j], [i, j]);
                await this.delay();
                
                [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
                this.renderArray();
                await this.delay();
            }
        }
        
        this.renderArray([i + 1, high], [i + 1, high]);
        await this.delay();
        
        [this.array[i + 1], this.array[high]] = [this.array[high], this.array[i + 1]];
        this.renderArray();
        await this.delay();
        
        return i + 1;
    }

    async mergeSort(left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            await this.mergeSort(left, mid);
            await this.mergeSort(mid + 1, right);
            await this.merge(left, mid, right);
        }
    }

    async merge(left, mid, right) {
        const n1 = mid - left + 1;
        const n2 = right - mid;
        const L = new Array(n1);
        const R = new Array(n2);
        
        for (let i = 0; i < n1; i++) {
            L[i] = this.array[left + i];
        }
        for (let j = 0; j < n2; j++) {
            R[j] = this.array[mid + 1 + j];
        }
        
        let i = 0, j = 0, k = left;
        
        while (i < n1 && j < n2) {
            this.currentStep++;
            this.comparisonCount++;
            this.updateStatus();
            
            this.renderArray([left + i, mid + 1 + j]);
            await this.delay();
            
            if (L[i] <= R[j]) {
                this.array[k] = L[i];
                i++;
            } else {
                this.array[k] = R[j];
                j++;
            }
            
            this.renderArray([], [k]);
            await this.delay();
            k++;
        }
        
        while (i < n1) {
            this.array[k] = L[i];
            this.renderArray([], [k]);
            await this.delay();
            i++;
            k++;
        }
        
        while (j < n2) {
            this.array[k] = R[j];
            this.renderArray([], [k]);
            await this.delay();
            j++;
            k++;
        }
    }

    async delay() {
        if (this.isPaused) {
            await new Promise(resolve => {
                this.resolveStep = resolve;
            });
        }
        const speed = parseInt(this.speedInput.value);
        return new Promise(resolve => setTimeout(resolve, 1000 - speed * 9));
    }

    updateCodeDisplay() {
        const algorithm = this.algorithmSelect.value;
        const language = this.languageSelect.value;
        
        if (this.algorithmImplementations[algorithm] && 
            this.algorithmImplementations[algorithm][language]) {
            this.codeDisplay.textContent = this.algorithmImplementations[algorithm][language];
        } else {
            this.codeDisplay.textContent = '// Implementation not available';
        }
    }

    updateCurrentStep(description) {
        this.currentStepDisplay.textContent = `Current Step: ${description}`;
    }

    playNote(frequency) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        gainNode.gain.value = 0.1;
        
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    updateAlgorithmInfo() {
        const algorithm = this.algorithmSelect.value;
        document.getElementById('algorithmExplanation').textContent = 
            this.algorithmExplanations[algorithm];
        
        const complexity = this.complexityInfo[algorithm];
        document.getElementById('bestCase').textContent = complexity.best;
        document.getElementById('avgCase').textContent = complexity.average;
        document.getElementById('worstCase').textContent = complexity.worst;
        document.getElementById('spaceComplexity').textContent = complexity.space;
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        // Update theme-specific colors
        this.updateThemeColors();
    }

    updateStats() {
        document.getElementById('totalComparisons').textContent = this.stats.totalComparisons;
        document.getElementById('totalSwaps').textContent = this.stats.totalSwaps;
        document.getElementById('timeElapsed').textContent = `${this.stats.timeElapsed.toFixed(2)}s`;
    }

    async compareAlgorithms() {
        const algorithms = ['bubble', 'selection', 'insertion', 'quick', 'merge'];
        const results = [];
        
        for (const algo of algorithms) {
            const startTime = performance.now();
            // Run algorithm
            const endTime = performance.now();
            results.push({
                algorithm: algo,
                time: endTime - startTime,
                comparisons: this.comparisonCount
            });
        }
        
        this.displayComparisonResults(results);
    }

    exportVisualization() {
        const data = {
            algorithm: this.algorithmSelect.value,
            array: this.array,
            stats: this.stats
        };
        
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sorting-visualization.json';
        a.click();
    }

    initializeTouchControls() {
        let touchStartX = 0;
        let touchStartY = 0;

        this.arrayContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        this.arrayContainer.addEventListener('touchmove', (e) => {
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            
            // Implement swipe gestures for control
        });
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        this.pauseBtn.textContent = this.isPaused ? 'Resume' : 'Pause';
        this.stepBtn.disabled = !this.isPaused;
        if (!this.isPaused && this.resolveStep) {
            this.resolveStep();
            this.resolveStep = null;
        }
    }

    step() {
        if (this.isPaused && this.resolveStep) {
            this.resolveStep();
            this.resolveStep = null;
        }
    }

    async skipToEnd() {
        this.isPaused = false;
        const speed = this.speedInput.value;
        this.speedInput.value = 100;
        await this.delay();
        this.speedInput.value = speed;
    }

    showCustomArrayModal() {
        this.customArrayModal.style.display = 'block';
    }

    hideCustomArrayModal() {
        this.customArrayModal.style.display = 'none';
    }

    handleCustomArray() {
        const input = document.getElementById('customArrayInput').value;
        const numbers = input.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
        
        if (numbers.length > 0) {
            this.array = numbers;
            this.renderArray();
            this.hideCustomArrayModal();
        } else {
            alert('Please enter valid numbers separated by commas');
        }
    }

    generateReversedArray() {
        const size = parseInt(this.sizeInput.value);
        this.array = Array.from({length: size}, (_, i) => size - i);
        this.renderArray();
    }

    generateNearlySortedArray() {
        const size = parseInt(this.sizeInput.value);
        this.array = Array.from({length: size}, (_, i) => i + 1);
        
        // Swap a few elements to make it nearly sorted
        for (let i = 0; i < size * 0.1; i++) {
            const idx1 = Math.floor(Math.random() * size);
            const idx2 = Math.floor(Math.random() * size);
            [this.array[idx1], this.array[idx2]] = [this.array[idx2], this.array[idx1]];
        }
        
        this.renderArray();
    }
}

// Initialize the visualizer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SortingVisualizer();
}); 