import { ItemsModel } from "./items";

export class DealItemsModel {
  constructor(
    public id: number,
    public price: number,
    public rating: number,
    public item: ItemsModel,
    public was?: number,
    public discountPercent?: number,
    public designation?: string,
    public brandIcon?: string,
    public deliveryIcon?: string,
    public deliveryType?: string,
    public totalReviews?: number
  ) {}

  static adapt(items: any): DealItemsModel {
    return items.map(
      (item: any) =>
        new DealItemsModel(
          item.id,
          item.price,
          item.rating,
          ItemsModel.adapt(item),
          item.was,
          item.discountPercent,
          item.designation,
          item.brandIcon,
          item.deliveryIcon,
          item.deliveryType,
          item.totalReviews
        )
    );
  }
}
