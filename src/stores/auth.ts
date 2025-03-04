import { defineStore } from "pinia";
import { useState } from "#app";

export const useAuthStore = defineStore("auth", () => {
    // ✅ Tạo state toàn cục
    const accessToken = useState("accessToken", () => "");
    const userId = useState("userId", () => "");

    // ✅ Hàm cập nhật accessToken & userId khi đăng nhập
    function setAuth(token: string, id: string) {
        accessToken.value = token;
        userId.value = id;
    }

    // ✅ Hàm đăng xuất
    function logout() {
        accessToken.value = "";
        userId.value = "";
    }

    return { accessToken, userId, setAuth, logout };
});
