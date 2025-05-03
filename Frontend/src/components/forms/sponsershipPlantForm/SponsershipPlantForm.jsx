import { useState } from 'react';
import FormInput from '../../inputField/InputField';
import './SponsershipPlantForm.css';
import axios from 'axios';
import { useAuth } from "../../../context/AuthContext";
import API_URL from '../../../config/api';

const SponsorPlant = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="max-w-md mx-auto p-4 mt-8 text-center bg-red-100 text-red-700 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Access Denied</h2>
                <p>You must be logged in to sponsor a plant.</p>
            </div>
        );
    }

    const UserId = user?.UserId || null;
    const [formData, setFormData] = useState({
        PlantingFor: '',
        otherRelation: '',
        NameOfRequestedPerson: '',
        TreeType: '',
        customTree: '',
        NumberOfTrees: 1,
        Description: '',
        RequestedLocation: '',
        LocationImage: null,
        Amount: ''
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'file' ? files : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');
        try {
            const form = new FormData();
            form.append('UserId', UserId);
            form.append('PlantingFor', formData.PlantingFor === 'Other' ? formData.otherRelation : formData.PlantingFor);
            form.append('NameOfRequestedPerson', formData.NameOfRequestedPerson);
            form.append('TreeType', formData.TreeType === 'Customize' ? formData.customTree : formData.TreeType);
            form.append('RequestedLocation', formData.RequestedLocation);
            form.append('Description', formData.Description);
            form.append('NumberOfTrees', formData.NumberOfTrees);
            form.append('Amount', formData.Amount);

            if (formData.LocationImage) {
                Array.from(formData.LocationImage).forEach(file => form.append('LocationImage', file));
            }

            const res = await axios.post(`${API_URL}/api/plant/plantationRequest`, form);
            setSuccessMessage("Plantation request submitted successfully!");
            setFormData({
                PlantingFor: '',
                otherRelation: '',
                NameOfRequestedPerson: '',
                TreeType: '',
                customTree: '',
                NumberOfTrees: 1,
                Description: '',
                RequestedLocation: '',
                Amount: '',
                LocationImage: null
            });
        } catch (error) {
            console.error('Submission error:', error);
            alert(error.response?.data?.error || 'Something went wrong!');
        }
    };

    const showBelovedFields = formData.PlantingFor === 'Other';
    const showCustomTreeField = formData.TreeType === 'Customize';

    return (
        <>
            <form onSubmit={handleSubmit} className="p-4 space-y-4 shadow-md rounded-lg bg-white max-w-md mx-auto">
                <h2 className="text-xl font-semibold">Sponsor a Plant</h2>

                {/* Plant in honour of */}
                <label>Plant in honour of</label>
                <select
                    name="PlantingFor"
                    value={formData.PlantingFor}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">-- Select --</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Sister">Sister</option>
                    <option value="Brother">Brother</option>
                    <option value="Husband">Husband</option>
                    <option value="Wife">Wife</option>
                    <option value="Self">Self</option>
                    <option value="Other">Other</option>
                </select>

                {showBelovedFields && (
                    <>
                        <FormInput
                            label="Your beloved"
                            name="otherRelation"
                            value={formData.otherRelation}
                            onChange={handleChange}
                            placeholder="Relation with beloved"
                            required
                        />
                        <FormInput
                            label="Beloved Name"
                            name="NameOfRequestedPerson"
                            value={formData.NameOfRequestedPerson}
                            onChange={handleChange}
                            placeholder="Beloved name"
                        />
                    </>
                )}

                {/* Plant selection */}
                <label>Plant to sponsor</label>
                <select
                    name="TreeType"
                    value={formData.TreeType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="">-- Choose Plant --</option>
                    <option value="Neem">Neem</option>
                    <option value="Peepal">Peepal</option>
                    <option value="Banyan">Banyan</option>
                    <option value="Mango">Mango</option>
                    <option value="Customize">Customize</option>
                </select>

                {showCustomTreeField && (
                    <FormInput
                        label="Your Desired Plant"
                        name="customTree"
                        value={formData.customTree}
                        onChange={handleChange}
                        placeholder="Plant name"
                    />
                )}

                {/* Tree Count */}
                <FormInput
                    label="Tree Count"
                    name="NumberOfTrees"
                    type="number"
                    value={formData.NumberOfTrees}
                    onChange={handleChange}
                    required
                />

                {/* Motive for plantation */}
                <label >Motive for Plantation</label>
                <textarea
                    name="Description"
                    value={formData.Description}
                    onChange={handleChange}
                    placeholder="share your thought"
                    rows={3}
                    required
                ></textarea>

                {/* Location selection */}
                <FormInput
                    label="Select location"
                    name="RequestedLocation"
                    placeholder="enter the location"
                    type="text"
                    value={formData.RequestedLocation}
                    onChange={handleChange}
                    required
                />

                {/* Image Upload */}
                <label>Upload Image</label>
                <input
                    type="file"
                    name="LocationImage"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full"
                    multiple
                    required
                />

                {/* Sponsor Coins */}
                <FormInput
                    label="Sponsor Coins"
                    name="Amount"
                    type="number"
                    value={formData.Amount}
                    onChange={handleChange}

                />

                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Submit
                </button>
            </form>
            {successMessage && (
                <div className="p-2 bg-green-100 text-green-800 rounded">
                    {successMessage}
                </div>
            )}
        </>
    );
};

export default SponsorPlant;
