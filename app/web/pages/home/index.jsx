import React, { useState, useCallback, useEffect, useRef } from 'react';
import router from 'umi/router';
import { Helmet } from 'react-helmet';
import { formatMessage } from 'umi-plugin-react/locale';
import { connect } from 'dva';
import { StickyContainer, Sticky } from 'react-sticky';
import { SearchBar, Grid, ListView } from 'antd-mobile';
import request from '@/utils/request';
import styles from './index.module.less';
import { Button, Upload, message, Icon, Popconfirm } from 'antd';
import { useFullscreen } from 'ahooks'
const Home = () => {
  const fullref = useRef()
  const [isFullscreen, { toggleFull }] = useFullscreen(fullref);
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }
  return (
    <div>
      <div className={styles.header}>
        头部
      </div>
      <div className={styles.content} ref={fullref}>

        <Button type="primary" onClick={toggleFull}>{isFullscreen ? '退出全屏' : '全屏'}</Button><br></br>
        <div>1.全屏状态:点击upload退出了全屏</div>
        <Upload {...props}>
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
        <div>2.全屏状态:点击pop无法显示</div>
        <Popconfirm
          title="Are you sure delete this task?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <a href="#">点击pop</a>
        </Popconfirm>
      </div>
    </div>
  )
}

export default connect(() => ({

}))(Home)
