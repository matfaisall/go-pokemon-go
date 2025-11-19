import axiosInstance from "@/lib/axios";

export const typeApi = {
  getTypeById: async (selectedType) => {
    const response = await axiosInstance.get(`/type/${selectedType}`);
    return response.data;
  },
};
