
// // Định nghĩa kiểu dữ liệu cho config
// interface ConfigStore {
//     [key: string]: any;
// }

// // Khởi tạo store dùng chung
// const configStore: ConfigStore = {};

// /**
//  * Tạo biến mới trong configStore
//  * @param key Tên biến
//  * @param initialValue Giá trị khởi tạo
//  */
// export const createConfig = <T>(key: string, initialValue: T): void => {
//     if (!(key in configStore)) {
//         configStore[key] = initialValue;
//     }
// };

// /**
//  * Lấy giá trị từ configStore
//  * @param key Tên biến
//  * @returns Giá trị đã lưu hoặc undefined nếu không tồn tại
//  */
// export const getConfig = <T>(key: string): T | undefined => {
//     return configStore[key];
// };

// /**
//  * Cập nhật giá trị trong configStore
//  * @param key Tên biến
//  * @param newValue Giá trị mới
//  */
// export const setConfig = <T>(key: string, newValue: T): void => {
//     if (key in configStore) {
//         configStore[key] = newValue;
//     } else {
//         console.warn(`Key "${key}" does not exist. Use createConfig() first.`);
//     }
// };

// /**
//  * Kiểm tra biến có tồn tại không
//  * @param key Tên biến
//  * @returns true nếu tồn tại, false nếu không
//  */
// export const hasConfig = (key: string): boolean => {
//     return key in configStore;
// };

// /**
//  * Xóa biến khỏi configStore
//  * @param key Tên biến
//  */
// export const deleteConfig = (key: string): void => {
//     delete configStore[key];
// };

// /**
//  * Hiển thị toàn bộ config hiện tại
//  */
// export const showAllConfig = (): void => {
//     console.table(configStore);
// };
