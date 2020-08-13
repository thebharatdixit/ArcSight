import React, { Component } from 'react';
import {StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import { View } from 'react-native-ui-lib';
import { transparent, overlayClare } from 'services/Theme';
import * as Progress from 'react-native-progress';
import ImageProgress from 'react-native-image-progress';
import check from './checked.png';

const styles = StyleSheet.create({
  checkIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: transparent,
    width: 25,
    height: 25,
  },
  overlay: {
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: overlayClare,
  },
});

class MediaItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
    };
  }
  static propTypes = {
    item: PropTypes.oneOf([]),
    imageMargin: PropTypes.number,
    imagesPerRow: PropTypes.number,
    onClick: PropTypes.func.isRequired,
  };
  static defaultProps = {
    item: {},
  };
  componentWillMount() {
    const { width } = Dimensions.get('window');
    this.imageSize =
      ((width - ((this.props.imagesPerRow + 1) * this.props.imageMargin))
        / this.props.imagesPerRow);
  }
  handleClick = (item) => {
    const result = this.props.onClick(item);
    this.setState({ check: result });
  };
  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{ marginBottom: this.props.imageMargin, marginRight: this.props.imageMargin }}
        onPress={() => this.handleClick(item.node.image)}
      >
        <ImageProgress
          indicator={Progress.CircleSnail}
          indicatorProps={{
            size: 80,
            borderWidth: 0,
            color: 'rgba(150, 150, 150, 1)',
            unfilledColor: 'rgba(200, 200, 200, 0.2)',
          }}
          source={{ uri: item.node.image.uri }}
          style={{ height: this.imageSize, width: this.imageSize }}
        >
          { (this.state.check) ?
            <View style={[styles.overlay, { height: this.imageSize, width: this.imageSize }]}>
              <Image
                style={[styles.checkIcon, { right: this.props.imageMargin + 5 }]}
                source={check}
              />
            </View>
            : null }
            </ImageProgress>
      </TouchableOpacity>
    );
  }
}

export default MediaItem;
