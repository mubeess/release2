import { Dimensions } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content';

interface SkeletonProps {
  isLoading: boolean;
  children?: any;
}
const { height, width } = Dimensions.get('window');

const SkeletonLoader = ({ isLoading, children }: SkeletonProps) => {
  return (
    <SkeletonContent
      containerStyle={{
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
      }}
      isLoading={isLoading}
      layout={[
        { width: '100%', height: 20, marginVertical: 20 },
        { width: '100%', height: 20, marginVertical: 20 },
        { width: '100%', height: 20, marginVertical: 20 },
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 20,
          children: [
            {
              height: height / 5,
              width: width / 4,
              marginHorizontal: 5,
            },
            {
              height: height / 5,
              width: width / 4,
              marginHorizontal: 5,
            },
            {
              height: height / 5,
              width: width / 4,
              marginHorizontal: 5,
            },
          ],
        },
      ]}
      duration={2000}
    >
      {children}
    </SkeletonContent>
  );
};

export default SkeletonLoader;
