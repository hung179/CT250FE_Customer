import mitt from "mitt";

type Events = {
    someEvent: string; // Ví dụ: Sự kiện có dữ liệu là string
    anotherEvent: number; // Ví dụ: Sự kiện có dữ liệu là số
};

export const eventBus = mitt<Events>();
