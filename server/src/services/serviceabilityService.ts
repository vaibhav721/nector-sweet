import { ServiceableAreaModel, ServiceableCityModel, ServiceablePincodeModel } from '../models/index.js';

export const checkPincodeServiceability = async (pincode: string) => {
  const pin = await ServiceablePincodeModel.findOne({ pincode, isActive: true })
    .populate('cityId')
    .populate('areaId');

  if (!pin) {
    return {
      serviceable: false,
      message: 'We will reach your location very soon.'
    };
  }

  return {
    serviceable: true,
    message: 'Great news! Nectar Sweet currently delivers here.',
    data: {
      pincode: pin.pincode,
      etaLabel: pin.etaLabel,
      city: (pin.cityId as any)?.label,
      area: (pin.areaId as any)?.label
    }
  };
};

export const getServiceabilityOptions = async () => {
  const cities = await ServiceableCityModel.find({ isActive: true }).sort({ label: 1 }).lean();

  const result = await Promise.all(
    cities.map(async (city) => {
      const areas = await ServiceableAreaModel.find({ cityId: city._id, isActive: true })
        .sort({ label: 1 })
        .lean();

      const areaData = await Promise.all(
        areas.map(async (area) => {
          const pincodes = await ServiceablePincodeModel.find({
            cityId: city._id,
            areaId: area._id,
            isActive: true
          })
            .sort({ pincode: 1 })
            .lean();

          return {
            id: String(area._id),
            name: area.name,
            label: area.label,
            pincodes: pincodes.map((item) => item.pincode)
          };
        })
      );

      return {
        id: String(city._id),
        name: city.name,
        label: city.label,
        areas: areaData
      };
    })
  );

  return result;
};
