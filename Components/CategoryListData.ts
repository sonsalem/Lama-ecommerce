import { WixCLientServer } from "@/lib/WixCLientServer";

const wixClient = await WixCLientServer();

const { items: CategoryListData } = await wixClient.collections
  .queryCollections()
  .find();

export default CategoryListData;
