import { ADDFOOD, DELETEFOOD, DOMAIN, GETDETAILFOOD, GETFOOD, GETTYPEFOOD, MODULEFOOD, SEARCHFOOD } from "@/constant/app.constant";
import axiosClient from "./axiosClient";
import { TAddFood } from "@/types/food/addFood.type";
import { TFoodDetail } from "@/types/food/foodDetail.type";
export const foodService = {
    async getAllFood(){
        try {
            const response = await axiosClient.get(`${DOMAIN}/${MODULEFOOD}/${GETFOOD}`)
            return response.data
        } catch (error){
            console.log(error);
        }
    },
    async getCategory(){
        try {
            const response = await axiosClient.get(`${DOMAIN}/${MODULEFOOD}/${GETTYPEFOOD}`)
            return response.data
        } catch (error){
            console.log(error);
        }
    },
    async searchFood(query : string){
        try {
            const response = await axiosClient.get(`${DOMAIN}/${MODULEFOOD}/${SEARCHFOOD}`,{
                params : { foodName : query }
            })
            return response.data
        } catch (error){
            console.log(error);
        }
    },
    async addFood(formData: FormData) {
        try {
            const response = await axiosClient.post(`${DOMAIN}/${MODULEFOOD}/${ADDFOOD}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    async deleteFood(foodId: number) {
        try {
            const response = await axiosClient.delete(`${DOMAIN}/${MODULEFOOD}/${DELETEFOOD}`,{
                params: { foodId: foodId }
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getDetailFood: async (foodId: number): Promise<TFoodDetail | undefined> => {
        try {
            const response = await axiosClient.get(`${DOMAIN}/${MODULEFOOD}/${GETDETAILFOOD}`, {
                params: { foodId: foodId }
            });
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }

}