import { connect } from 'mongoose';

const connectToMongo = async () => {
  await connect(process.env.dbUrl);
}
export default connectToMongo