import React, { Component } from 'react';
import { StyleSheet, ListView, Platform, CameraRoll } from 'react-native';
import { Colors, View, Button, Text } from 'react-native-ui-lib';
import { APP_HEIGHT, APP_WIDTH, setWidth, acidRed, white } from 'services/Theme';
import { logException } from 'services/Utils';
import Spinner from 'react-native-loading-spinner-overlay';
import PropTypes from 'prop-types'
import MediaItem from './MediaItem';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingRight: 0,
    height: APP_HEIGHT,
  },
  listContainer: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  spinner: {
    color: white,
    textAlign: 'center',
  },
  emptyMessaje: {
    height: APP_HEIGHT - 120,
    width: APP_WIDTH,
  },
});

class MediaPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      selectedItems: [],
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      loader: true,
      viewImages: true,
    };
  }

  static propTypes = {
    imageMargin: PropTypes.number,
    backgroundColor: PropTypes.string,
    stickyHeaderIndices: PropTypes.oneOf([]),
    onEndReachedThreshold: PropTypes.number,
    emptyMessage: PropTypes.string,
    initialListSize: PropTypes.number,
    pageSize: PropTypes.number,
    scrollRenderAheadDistance: PropTypes.number,
    imagesPerRow: PropTypes.number,
    groupTypes: PropTypes.oneOf(['Album', 'All', 'Event', 'Faces', 'Library', 'PhotoStream', 'SavedPhotos']),
    assetType: PropTypes.oneOf(['Photos', 'Videos', 'All']),
    maximum: PropTypes.number,
    sendText: PropTypes.string,
    callback: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
  };
  static defaultProps = {
    stickyHeaderIndices: [],
    onEndReachedThreshold: 10000,
    initialListSize: 10,
    pageSize: 24,
    scrollRenderAheadDistance: 50,
    imagesPerRow: 3,
    groupTypes: 'SavedPhotos',
    assetType: 'Photos',
    maximum: 15,
  };

  componentWillMount() {
    this.loadImages();
  }

  loadImages = async () => {
    const fetchParams = {
      first: 5000,
      groupTypes: this.props.groupTypes,
      assetType: this.props.assetType,
    };
    if (Platform.OS === 'android') delete fetchParams.groupTypes;
    if (this.state.lastCursor) fetchParams.after = this.state.lastCursor;
    try {
      const result = await CameraRoll.getPhotos(fetchParams);
      result.edges.sort((a, b) => b.node.timestamp - a.node.timestamp);
      if (result.edges.length === 0) {
        this.setState({viewImages: false});
      }
      const rows = [];
      while (result.edges.length > 0) {
        rows.push(result.edges.splice(0, this.props.imagesPerRow));
      }
      this.setState({dataSource: this.state.dataSource.cloneWithRows(rows), loader: false});
    } catch (e) {
      console.log('Error: ', e.message);
      logException(e.message);
      this.setState({loader: false});
    }
    send = () => {
      this.props.callback(this.state.selected, this.state.selectedItems);
      this.setState({
        selected: [],
        selectedItems: [],
      });
    };
    handleClick = (item) => {
      const {uri} = item;
      let select = false;

      const selectedItem = {
        filename: item.filename,
      };

      const {selected} = this.state;
      const {selectedItems} = this.state;
      const index = selected.indexOf(uri);
      if (index >= 0) {
        selected.splice(index, 1);
        selectedItems.splice(index, 1);
        select = false;
      } else if (selected.length < this.props.maximum) {
        selected.push(uri);
        selectedItems.push(selectedItem);
        select = true;
      }
      this.setState({selected});
      return select;
    };
    renderRow = (data) => {
      const items = data.map((item) => {
        if (item === null) {
          return null;
        }
        const signature = item.node.image.uri;
        const index = this.state.selected.indexOf(signature);
        this.selected = index >= 0;
        return (
          <MediaItem
            item={item}
            imageMargin={this.props.imageMargin}
            imagesPerRow={this.props.imagesPerRow}
            onClick={picture => this.handleClick(picture)}
          />
        );
      });
      return (
        <View style={styles.row}>
          {items}
        </View>
      );
    };
    render()
    {
      const {selected, dataSource, viewImages} = this.state;
      return (
        <View
          paddingT-30
          style={[
            styles.wrapper,
            {padding: this.props.imageMargin, backgroundColor: this.props.backgroundColor},
          ]}
        >
          <Spinner
            visible={this.state.loader}
            textContent="Cargando imagenes, esto puede tardar un poco"
            textStyle={styles.spinner}
            overlayColor="rgba(0, 0, 0, .8)"
            animation="fade"
          />
          {selected.length >= this.props.maximum &&
          <Text light gray center>
            No se puede subir más de {this.props.maximum} imagenes por intento.
          </Text>}
          {viewImages ?
            <ListView
              stickyHeaderIndices={this.props.stickyHeaderIndices}
              onEndReachedThreshold={this.props.onEndReachedThreshold}
              initialListSize={this.props.initialListSize}
              pageSize={this.props.pageSize}
              scrollRenderAheadDistance={this.props.scrollRenderAheadDistance}
              style={styles.list}
              contentContainerStyle={styles.listContainer}
              dataSource={dataSource}
              renderRow={rowData => this.renderRow(rowData)}
            /> :
            <View center style={styles.emptyMessaje}>
              <Text center subtitle white>{this.props.emptyMessage}</Text>
            </View>
          }
          <View center row>
            <Button
              backgroundColor={acidRed}
              style={setWidth((APP_WIDTH / 2) - 20)}
              light
              margin-10
              size="medium"
              label="Cancelar"
              enableShadow
              onPress={() => this.props.cancel()}
            />
            <Button
              backgroundColor={Colors.primary}
              style={setWidth((APP_WIDTH / 2) - 20)}
              light
              margin-10
              disabled={this.state.selected.length === 0}
              size="medium"
              label={this.props.sendText}
              enableShadow
              onPress={() => this.send()}
            />
          </View>
        </View>
      );
    }
  };
}

export default MediaPicker
