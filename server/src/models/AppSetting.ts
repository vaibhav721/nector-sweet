import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const appSettingSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    value: { type: Schema.Types.Mixed, required: true },
    description: { type: String }
  },
  {
    timestamps: true
  }
);

export type AppSettingDocument = InferSchemaType<typeof appSettingSchema>;
export const AppSettingModel = mongoose.model('AppSetting', appSettingSchema);
