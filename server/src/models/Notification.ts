import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const notificationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ['ORDER', 'SUBSCRIPTION', 'SYSTEM'], required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    metadata: { type: Schema.Types.Mixed }
  },
  {
    timestamps: true
  }
);

notificationSchema.index({ userId: 1, isRead: 1 });

export type NotificationDocument = InferSchemaType<typeof notificationSchema>;
export const NotificationModel = mongoose.model('Notification', notificationSchema);
