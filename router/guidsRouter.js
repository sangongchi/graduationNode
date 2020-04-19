const express = require('express');
const router = express.Router();
const mongoApi = require('../db/api');

const looger = require('morgan'); //日志记录模块引入

router.post('/guidSystems', async (req, res) => {
  let systems = [
    {
      ImgSrc:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587223712746&di=fe68b459c98a51f9d6b2c4b5ec7ce133&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D3363001160%2C1163944807%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D830',
      identify: 'name',
      id: 'id',
      resPath: 'http://sangongchi.top:7300',
      resName: 'easyMock平台',
    },
    {
      ImgSrc:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587223712746&di=fe68b459c98a51f9d6b2c4b5ec7ce133&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D3363001160%2C1163944807%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D830',
      identify: 'name',
      id: 'id',
      resPath: 'http://sangongchi.top:8080',
      resName: 'jenkins自动化构建平台',
    },
  ];
  res.send({ message: '获取系统列表信息成功', err: '-1', systems: systems });
});
module.exports = router;
