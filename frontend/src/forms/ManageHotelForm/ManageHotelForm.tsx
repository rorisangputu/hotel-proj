import { useForm } from "react-hook-form";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  adultCount: number;
  childCount: number;
  facilities: string[];
  imageFiles: FileList;
};

const ManageHotelForm = () => {
    const formMethods = useForm<HotelFormData>();
    return (
        <form>
            
        </form>);
};

export default ManageHotelForm;
