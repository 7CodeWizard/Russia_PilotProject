const Case = require('../models/caseModel')
const Equipment = require('../models/equipModel')
const Factory = require('../models/factoryShowModel')
const Review = require('../models/reviewModel')
const Site = require('../models/siteModel')
// const Team = require('../models/teamModel')
// const Three = require('../models/threeDModel')

const searchData = async (req, res) => {
  const searchTerm = req.body.searchTerm

  try {
    const regex = new RegExp(`.*${searchTerm}.*`, "i")

    const caseData = await Case.find({
      $or: [
        { name: { $regex: regex } },
        { type: { $regex: regex } },
        { startDate: { $regex: regex } },
        { endDate: { $regex: regex } },
        { guests: { $regex: regex } },
        { venue: { $regex: regex } },
      ]
    })

    let caseMatchedData = caseData.map(item => {
      let matchedField = ''

      if (item.name?.match(regex)) matchedField = item.name
      else if (item.type?.match(regex)) matchedField = item.type
      else if (item.startDate?.match(regex)) matchedField = item.startDate
      else if (item.endDate?.match(regex)) matchedField = item.endDate
      else if (item.guests?.match(regex)) matchedField = item.guests
      else if (item.venue?.match(regex)) matchedField = item.venue

      return { link: `/case-one/${item._id}`, id: item._id, value: matchedField }
    })

    const equipmentData = await Equipment.find({
      $or: [
        { name: { $regex: regex } },
        { type: { $regex: regex } },
        { categoryType: { $regex: regex } },
        { brand: { $regex: regex } },
        { description: { $regex: regex } },
        { manufacturer: { $regex: regex } },
        { weight: { $regex: regex } },
        { series: { $regex: regex } }
      ]
    })

    let equipmentMatchedData = equipmentData.map(item => {
      let matchedField = ''

      if (item.name?.match(regex)) matchedField = item.name
      else if (item.type?.match(regex)) matchedField = item.type
      else if (item.categoryType?.match(regex)) matchedField = item.categoryType
      else if (item.brand?.match(regex)) matchedField = item.brand
      else if (item.description?.match(regex)) matchedField = item.description
      else if (item.manufacturer?.match(regex)) matchedField = item.manufacturer
      else if (item.weight?.match(regex)) matchedField = item.weight
      else if (item.series?.match(regex)) matchedField = item.series

      return { link: `/equipment-one/${item._id}`, id: item._id, value: matchedField }
    })

    const factoryData = await Factory.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
      ]
    })

    let factoryMatchedData = factoryData.map(item => {
      let matchedField = ''

      if (item.title?.match(regex)) matchedField = item.title
      else if (item.description?.match(regex)) matchedField = item.description

      return { link: '/', scrollSpy: 'blogSection', id: item._id, value: matchedField }
    })

    const reviewData = await Review.find({
      $or: [
        { name: { $regex: regex } },
        { content: { $regex: regex } },
      ]
    })

    let reviewMatchedData = reviewData.map(item => {
      let matchedField = ''

      if (item.name?.match(regex)) matchedField = item.name
      else if (item.content?.match(regex)) matchedField = item.content

      return { link: '/services', scrollSpy: 'customerReviewSection', id: item._id, value: matchedField }
    })

    const siteData = await Site.find({
      $or: [
        { name: { $regex: regex } },
        { type: { $regex: regex } },
        { capacity: { $regex: regex } },
        { address: { $regex: regex } },
      ]
    })

    let siteMatchedData = siteData.map(item => {
      let matchedField = ''

      if (item.name?.match(regex)) matchedField = item.name
      else if (item.type?.match(regex)) matchedField = item.type
      else if (item.capacity?.match(regex)) matchedField = item.capacity
      else if (item.address?.match(regex)) matchedField = item.address

      return { link: `/site-one/${item._id}`, id: item._id, value: matchedField }
    })

    const searchResult = [...caseMatchedData, ...equipmentMatchedData, ...factoryMatchedData, ...reviewMatchedData, ...siteMatchedData]

    res.json(searchResult)
  } catch (err) {
    return res.status(400).json({ error: err })
  }
}

module.exports = { searchData }