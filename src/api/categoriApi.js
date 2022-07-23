const STORAGE_ITEM_NAME = 'appData'

// Check Storage Available
export const storageAvailable = (type) => {
  try {
    const storage = window[type]
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    console.log('e:', e)
    return false
  }
}

// Set Data from storage
const setDataToStore = (data, name = STORAGE_ITEM_NAME) => {
  localStorage.setItem(name, JSON.stringify(data))
}

// Check Data from Storage
export const checkDataFromStorage = (name = STORAGE_ITEM_NAME) => {
  if (!localStorage.getItem(name)) {
    const storageArr = []
    setDataToStore(storageArr)
  }
}

// Parse Data from Storage
const parseJsonToStore = (name = STORAGE_ITEM_NAME) => {
  return JSON.parse(localStorage.getItem(name))
}

// Get Data from Storage
export const getDataFromStorage = () => parseJsonToStore()

// Save Data To Storage
export const saveDataToStorage = (data) => {
  const storedData = getDataFromStorage()
  storedData.push(data)

  setDataToStore(storedData)
}

// Delete Data by Id from Storage
export const deleteDataByIdFromStorage = (id) => {
  const parsedItem = parseJsonToStore()
  const filteredById = parsedItem.filter((_el, idx) => idx !== id)

  setDataToStore(filteredById)
}

// Update Data to Storage
export const updateDataToStorage = (data, id) => {
  const storedData = getDataFromStorage()
  storedData[id] = data

  setDataToStore(storedData)
}
