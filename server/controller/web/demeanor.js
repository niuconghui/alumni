const result = require('../../utils/result')

const AlumniModel = require('../../models/Demeanor')

const UserModel = require('../../models/StudentUser')

exports.getAlumni = async(req, res) => {
  let items 
  const total = await AlumniModel.find({ tag: '校友'}).count()
  const page = req.query.page
  const limit = req.query.limit
  if(/\d/.test(page) && page > 0 && /\d/.test(limit)) {
    items = await AlumniModel
      .find({ tag: '校友'})
      .sort({ "issueTime": -1 })
      .skip( (page - 1) * limit )
      .limit( limit * 1 ) 
  } else {
    items = await AlumniModel
    .find({ tag: '校友'})
    .sort({ "issueTime": -1 })
  }

  res.send(result.success({
    items,
    total,
    page
  }))
}

exports.getAcademician = async(req, res) => {
  let items 
  const total = await AlumniModel.find({ tag: '院士'}).count()
  const page = req.query.page
  const limit = req.query.limit
  if(/\d/.test(page) && page > 0 && /\d/.test(limit)) {
    items = await AlumniModel
      .find({ tag: '院士'})
      .sort({ "issueTime": -1 })
      .skip( (page - 1) * limit )
      .limit( limit * 1 ) 
  } else {
    items = await AlumniModel
    .find({ tag: '院士'})
    .sort({ "issueTime": -1 })
  }

  res.send(result.success({
    items,
    total,
    page
  }))
}

exports.getDemeanorDetail = async(req, res) => {
  const items = await AlumniModel
    .findById(req.params.id)
  res.send(result.success(items))
}

exports.search = async(req, res) => {
  
  const { keyword, address, department, gender, grade } = req.query

  let reg_keyword = new RegExp(keyword, 'i')

  if (keyword || address || department || gender || grade) {
    const field = {
      $or: [
        { studentName: { $regex: reg_keyword } },
        { trueName: { $regex: reg_keyword } },
        { studentID: { $regex: reg_keyword } },
        { phoneID: { $regex: reg_keyword } },
        { email: { $regex: reg_keyword } },
        { company_name: { $regex: reg_keyword } },
        { motto: { $regex: reg_keyword } },
      ]
    }
    if (grade !== '' || gender !== '' || address !== undefined || department !== undefined) {
      field.$and = []
    }
    if (grade !== '') {
      field.$and.push({ grade })
    }
    if (gender !== '') {
      field.$and.push({ gender })
    }
    if (address !== undefined) {
      field.$and.push({ 
        $or: [
          { address: eval("/"  + address[address.length - 1] + "/m") },
          { birthplace: eval("/"  + address[address.length - 1] + "/m") } 
        ]
      })
    }
    if (department !== undefined) {
      field.$and.push({ department: eval("/"  + department[department.length - 1] + "/m")  })
    }
  
    let items 
    items = await UserModel.find(field)
    res.send(result.success(items))
  } else {
    res.send(result.error(-1, '请输入查询条件'))
  }

    
}

exports.getProvince = async(req, res) => {
  const items = await UserModel.find({}).select("address")

  const address = items.map(item => {
    return item.address[0]
  })

  const province = {}
  address.forEach(item => {
    if (province[item]) {
      province[item] = province[item] + 1
    } else {
      province[item] = 1
    }
  })
  res.send(result.success(province))
}