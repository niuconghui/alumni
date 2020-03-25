const result = require('../../utils/result')
const util = require('../../utils/util')

const ExchangeModel = require('../../models/Exchange')
const CategoryModel = require('../../models/Category')
const CommentModel = require('../../models/Comment')

exports.getExchange = async(req, res) => {
  let items
  const queryKey = req.query.type
  const page = req.query.page

  if (/\d/.test(page) && page > 0) {
    if (queryKey === '5e43637af8b8801df8dc2d83') {
      // queryKey === 推荐
      items = await ExchangeModel
        .find()
        .populate('userId')
        .sort("-starNum")
        .limit(10)
        .skip( (page - 1) * 10 )
    } else if (queryKey === '5e436360f8b8801df8dc2d82') {
      // queryKey === 全部
      items = await ExchangeModel
        .find()
        .populate('userId')
        .sort("-created_time")
        .limit(10)
        .skip( (page - 1) * 10 )
    } else if (queryKey) {
      items = await ExchangeModel
        .find({ category: queryKey })
        .populate('userId')
        .limit(10)
        .skip( (page - 1) * 10 )
    }
    else {
      items = await ExchangeModel
        .find()
        .populate('userId')
        .limit(10)
        .skip( (page - 1) * 10 )
    }
  } else {
    items = await ExchangeModel.find()
  }
   
  const userInfo = await util.parseUserByToken(req.headers.authorization)
  
  const data = items.map(item => {
    let canStar
    if (userInfo && item.starNum.includes(userInfo.id)) {
      canStar = false
    } else {
      canStar = true
    }
    let json = item.toJSON()
    json.starNum = item.starNum.length
    
    return Object.assign(json, { canStar })
  })
  
  res.send(result.success({items: data, page}))
}

exports.getExchangeDetail = async(req, res) => {
  const userInfo = await util.parseUserByToken(req.headers.authorization)

  let canStar

  const item = await ExchangeModel
    .findById(req.params.id)
    .populate('userId')

  if (item.starNum.includes(userInfo.id)) {
    canStar = false
  } else {
    canStar = true
  }

  let json = item.toJSON()
  json.starNum = item.starNum.length

  const data = Object.assign(json, { canStar })
  // const data = items.map(item => {
  //   let canStar
  //   if (item.starNum.includes(userInfo.id)) {
  //     canStar = false
  //   } else {
  //     canStar = true
  //   }
  //   let json = item.toJSON()
  //   json.starNum = item.starNum.length
    
  //   return Object.assign(json, { canStar })
  // })  

  res.send(result.success({items: data}))
}

exports.savaExchange = async(req, res) => {
  const model = await ExchangeModel.create(req.body)
  res.send(result.success(model))
}

exports.updateExchange = async(req, res) => {
  const { _id, category, title, content } = req.body
  const model = await ExchangeModel.findByIdAndUpdate(_id, {
    category: category,
    title: title,
    content: content
  })
  res.send(result.success(model))
}

exports.deleteExchange = async(req, res) => {
  await ExchangeModel
    .findById(req.params.id)
    .then(doc => {
      doc.remove()
      res.send(result.success(doc))
    })
    .catch(err => {
      res.send(result.error(-1, err.message))
    })
}

exports.getUserExchanges = async(req, res) => {
  const userInfo = await util.parseUserByToken(req.headers.authorization)

  const id = req.params.id
  const items = await ExchangeModel
    .find({userId: id})
    .populate('userId')
    .populate('category')

  const data = items.map(item => {
    let canStar
    if (item.starNum.includes(userInfo.id)) {
      canStar = false
    } else {
      canStar = true
    }
    let json = item.toJSON()
    json.starNum = item.starNum.length
    
    return Object.assign(json, { canStar })
  })

  res.send(result.success({items: data}))
}

exports.getOtherUserExchanges = async(req, res) => {
  const userInfo = await util.parseUserByToken(req.headers.authorization)
  if(!userInfo) return res.send(result.error(-1, 'token 错误'))

  const id = req.params.id
  const items = await ExchangeModel
      .find({userId: id})
      .populate('userId')
      .populate('category')
  res.send(result.success(items))  
}

exports.star = async(req, res) => {
  const userInfo = await util.parseUserByToken(req.headers.authorization)

  const exchangeId = req.params.id
  
  await ExchangeModel
    .updateOne({_id: exchangeId}, {"$addToSet": {starNum: userInfo.id}})
    .then(() => {
      res.send(result.success())
    })
    .catch((err) => {
      console.log(err);
      res.send(result.error(-1, err.message))
    })

}

exports.saveComment = async(req, res) => {
  const userInfo = await util.parseUserByToken(req.headers.authorization)

  const exchangeId = req.params.id
  const items = await CommentModel.create({
    user: userInfo.id,
    exchange: exchangeId,
    content: req.body.content
  })
  await ExchangeModel.updateOne({_id: exchangeId}, { $inc: {commentNum: 1} })  
  res.send(result.success(items))
}

exports.getComments = async(req, res) => {
  const exchangeId = req.params.id
  await CommentModel
    .find({exchange: exchangeId})
    .populate('user')
    .sort('-created_time')
    .then((items) => {
      res.send(result.success(items))
    })
    .catch((err) => {
      res.send(result.error(-1, err.message))
    })
}

exports.deleteComment = async(req, res) => {
  const { id: _id } = req.params
  await CommentModel
    .findById(_id)
    .then(doc => {
      doc.remove()
      res.send(result.success())
    })
    
    .catch(err => {
      res.send(result.error(-1, err.message))
    })
}   
 
exports.getCategory = async(req, res) => {
  const items = await CategoryModel.find({ tag: '交流'})
  res.send(result.success(items))
}



