import { useNavigate } from 'react-router-dom';
import { useRazorpay } from "react-razorpay";
import axios from '../config/axiosconfig';
import env_variables from '../config/envconfig';
const useCreateRoom = () => {
    const { error, isLoading, Razorpay } = useRazorpay();
    const navigate = useNavigate();
    const roomHandler = async (roomData) => {
        try {
            console.log(import.meta.env.VITE_BASE_URL);
            const response = await axios.post('/payment/create-subscription', {
                sub_type: roomData.subscription
            }, {
                withCredentials: true,
            });
            const subscription = response.data;
            console.log(subscription);
            if (response.status === 200) {
                const options = {
                    key: env_variables.RAZORPAY_KEY_ID,
                    currency: 'INR',
                    name: 'Society Log',
                    description: 'create your room',
                    subscription_id: subscription.subscription.id,
                    prefill: {
                        name: roomData.name,
                        email: roomData.email,
                        contact: "+919500040431"
                    },
                    theme: {
                        color: '#F37254'
                    },
                    handler: async function () {
                        const formData = {
                            ...roomData,
                            subscriptionStatus: 'active',
                            subscriptionId: subscription.subscription.id
                        }
                        const addRoomData = await axios.post(
                            '/createRoom',
                            formData, {
                            withCredentials: true
                        }
                        );
                        if (addRoomData.status === 200) {
                            navigate('/dash');
                        }

                    }
                };
                if (error){
                      console.log(error);
                };
                const razorpayInstance = new Razorpay(options);
                razorpayInstance.open();

            }

        } catch (error) {
            console.log(error);
        }

    }
    return roomHandler;
}

export { useCreateRoom }
