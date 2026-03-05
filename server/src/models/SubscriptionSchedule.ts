import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const subscriptionScheduleSchema = new Schema(
  {
    subscriptionId: {
      type: Schema.Types.ObjectId,
      ref: 'Subscription',
      required: true,
      index: true
    },
    date: { type: Date, required: true },
    action: {
      type: String,
      enum: ['SKIP', 'EXTRA_QUANTITY', 'SET_QUANTITY'],
      required: true
    },
    extraQuantity: { type: Number },
    quantity: { type: Number },
    note: { type: String }
  },
  {
    timestamps: true
  }
);

subscriptionScheduleSchema.index({ subscriptionId: 1, date: 1 });

export type SubscriptionScheduleDocument = InferSchemaType<typeof subscriptionScheduleSchema>;
export const SubscriptionScheduleModel = mongoose.model('SubscriptionSchedule', subscriptionScheduleSchema);
