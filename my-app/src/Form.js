import React, { useState, useEffect } from 'react';
import './index.css';


function App() {
  const [showAdditionalShippingCost, setShowAdditionalShippingCost] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    costPrice: '',
    sellingPrice: '',
    gstRate: '',
    discount: '',
    length: '',
    breadth: '',
    height: '',
    measurementDimensions:'',
    percentOrValue:'',
    packingWeight: '',
    weightDimensions: '',
    categoryUnit: '',
    tierUnit: '',
    shippingOption: '',
    localShippingCost: '',
    regionalShippingCost: '',
    nationalShippingCost: ''
  });

  let [formData, setFormData] = useState({ });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      costPrice: formValues.costPrice,
      sellingPrice: formValues.sellingPrice,
      gstRate: formValues.gstRate,
      discount: formValues.discount,
      length: formValues.length,
      breadth: formValues.breadth,
      height: formValues.height,
      packingWeight: formValues.packingWeight,
      categoryUnit: formValues.categoryUnit,
      tierUnit: formValues.tierUnit,
      shippingOption: formValues.shippingOption,
      localShippingCost: formValues.localShippingCost,
      regionalShippingCost: formValues.regionalShippingCost,
      nationalShippingCost: formValues.nationalShippingCost
    };

    if(formValues.weightDimensions==="kg"){
      payload.packingWeight = (formValues.packingWeight*1000).toString()
    }
  

  if (formValues.percentOrValue === "%") {
      payload.discount = (formValues.sellingPrice * formValues.discount) / 100;
    }
    try {
      const response = await fetch(`https://marginanalyse.azurewebsites.net/api/marginv1?costPrice=${payload.costPrice}&sellingPrice=${payload.sellingPrice}&gstRate=${payload.gstRate}&discount=${payload.discount}&length=${payload.length}&breadth=${payload.breadth}&height=${payload.height}&packingWeight=${payload.packingWeight}&categoryUnit=${payload.categoryUnit}&tierUnit=${payload.tierUnit}&shippingOption=${payload.shippingOption}&localShippingCost=${payload.localShippingCost}&regionalShippingCost=${payload.regionalShippingCost}&nationalShippingCost=${payload.nationalShippingCost}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // Parse the JSON response
      console.log(data);
      formData = data; 
       console.log(data.Nett_Settlment_Local)                   // Log the JSON response
    } catch (error) {
      console.log(error);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
            setFormValues({
            ...formValues,
            [name]: value,
          });
  
    if (name === "shippingOption") {
      setShowAdditionalShippingCost(value === "Easy Ship");
    }
  };
  

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div className='formFields'>
        <input className='lineOne' type="text" id="costPrice" name="costPrice" value={formValues.costPrice} placeholder="Cost Price" onChange={handleChange} />
        <input className='lineOne' type="text" id="sellingPrice" name="sellingPrice" value={formValues.sellingPrice} placeholder="Selling Price" onChange={handleChange} />
      </div>
      <div className='formFields'>
        <select className='lineTwo' id="gstValues" name="gstRate" value={formValues.gstRate} onChange={handleChange}>
          <option value="0.00">0%</option>
          <option value="0.05">5%</option>
          <option value="0.12">12%</option>
          <option value="0.18">18%</option>
          <option value="0.28">28%</option>
        </select>
        <input className='lineTwo' type="text" id="discount" name="discount" value={formValues.discount} placeholder="Discount" onChange={handleChange} />
        <select className='lineTwo' id="percentOrValue" name="percentOrValue" value={formValues.percentOrValue} onChange={handleChange}>
          <option value="%">%</option>
          <option value="value">value</option>
        </select>
      </div>
      <div className='formFields'>
        <input className='lineThree' type="number" id="length" name="length" value={formValues.length} placeholder="Length" onChange={handleChange} />
        <input className='lineThree' type="number" id="breadth" name="breadth" value={formValues.breadth} placeholder="Width" onChange={handleChange} />
        <input className='lineThree' type="number" id="height" name="height" value={formValues.height} placeholder="Height" onChange={handleChange} />
        <select className='lineThree' id='measurementDimensions'
          value={formValues.measurementDimensions}
          onChange={handleChange}
          name="measuremtnDimensions"
        >
          <option value="cm">cm</option>
          <option value="inch">inch</option>
        </select>
      </div>
      <div className='formFields'>
        <input className='lineFour' type="number" id="packingWeight" name="packingWeight" value={formValues.packingWeight} placeholder="Packaging Weight" onChange={handleChange} />
        <select className='lineFour' id='weightDimensions'
          value={formValues.weightDimension}
          name="weightDimensions"
          onChange={handleChange}
        >
          <option value="g">g</option>
          <option value="kg">kg</option>
        </select>
      </div>
      <div className='formFields'>
        <select className='lineFive' id="categoryUnit" name="categoryUnit" value={formValues.categoryUnit} onChange={handleChange}>
          <option value="">Select Product Category</option>
          <option value="Books">Books</option>
          <option value="School Textbook Bundles">School Textbook Bundles</option>
          <option value="Movies">Movies</option>
          <option value="Music">Music</option>
          <option value="Video Games">Video Games</option>
          <option value="Video Games - Consoles">Video Games - Consoles</option>
          <option value="Video Games - Accessories">Video Games - Accessories</option>
          <option value="Software products">Software products</option>
          <option value="Video Games - Online game services">Video Games - Online game services</option>
          <option value="Toys">Toys</option>
          <option value="Toys - Drones">Toys - Drones</option>
          <option value="Toys - Balloons and Soft Toys">Toys - Balloons and Soft Toys</option>
          <option value="Pet Supplies">Pet Supplies</option>
          <option value="Beauty Products">Beauty Products</option>
          <option value="Deodorants">Deodorants</option>
          <option value="Facial Steamers">Facial Steamers</option>
          <option value="Beauty - Fragrance">Beauty - Fragrance</option>
          <option value="Luxury Beauty">Luxury Beauty</option>
          <option value="Health and Personal Care - Medical Equipment">Health and Personal Care - Medical Equipment</option>
          <option value="Health and Personal Care - Nutrition">Health and Personal Care - Nutrition</option>
          <option value="Health and Personal Care - Ayurvedic products, Oral care, hand sanitisers, Pooja supplies">Health and Personal Care - Ayurvedic products, Oral care, hand sanitisers, Pooja supplies</option>
          <option value="Health and Personal Care - Other Household Supplies">Health and Personal Care - Other Household Supplies</option>
          <option value="Health and Personal Care - Contact lens and reading glasses">Health and Personal Care - Contact lens and reading glasses</option>
          <option value="Health and Personal Care (HPC) - Other Products">Health and Personal Care (HPC) - Other Products</option>
          <option value="Baby Hardlines - Swings, Bouncers and Rockers, Carriers, Walkers">Baby Hardlines - Swings, Bouncers and Rockers, Carriers, Walkers</option>
          <option value="Baby Safety - Guards &amp; Locks">Baby Safety - Guards &amp; Locks</option>
          <option value="Baby Room Décor">Baby Room Décor</option>
          <option value="Baby Furniture">Baby Furniture</option>
          <option value="Baby Car Seats &amp; Accessories">Baby Car Seats &amp; Accessories</option>
          <option value="Baby Strollers, Buggies &amp; Prams">Baby Strollers, Buggies &amp; Prams</option>
          <option value="Baby Products - Other Products">Baby Products - Other Products</option>
          <option value="Grocery and Gourmet - Other Products">Grocery and Gourmet - Other Products</option>
          <option value="Grocery and Gourmet - Hampers and gifting">Grocery and Gourmet - Hampers and gifting</option>
          <option value="Pharmacy (Prescription Medicines)">Pharmacy (Prescription Medicines)</option>
          <option value="Personal Care Appliances - Grooming and styling">Personal Care Appliances - Grooming and styling</option>
          <option value="Personal Care Appliances - Electric Massagers">Personal Care Appliances - Electric Massagers</option>
          <option value="Personal Care Appliances - Glucometer and Glucometer Strips">Personal Care Appliances - Glucometer and Glucometer Strips</option>
          <option value="Personal Care Appliances - Thermometers">Personal Care Appliances - Thermometers</option>
          <option value="Personal Care Appliances - Weighing Scales and Fat Analysers">Personal Care Appliances - Weighing Scales and Fat Analysers</option>
          <option value="Personal Care Appliances - Weighing Scales and Fat Analysers">Personal Care Appliances - Weighing Scales and Fat Analysers</option>
          <option value="Personal Care Appliances - Other Products">Personal Care Appliances - Other Products</option>
          <option value="Apparel - Sarees and Dress Materials">Apparel - Sarees and Dress Materials</option>
          <option value="Apparel - Sweat Shirts and Jackets">Apparel - Sweat Shirts and Jackets</option>
          <option value="Apparel - Shorts">Apparel - Shorts</option>
          <option value="Apparel - Womens' Kurtas, Kurtis and Salwar Suits">Apparel - Womens' Kurtas, Kurtis and Salwar Suits</option>
          <option value="Apparel - Men's T-shirts (except Polos, Tank tops and full sleeve tops)">Apparel - Men's T-shirts (except Polos, Tank tops and full sleeve tops)</option>
          <option value="Apparel - Womens' Innerwear / Lingerie">Apparel - Womens' Innerwear / Lingerie</option>
          <option value="Apparel - Other innerwear">Apparel - Other innerwear</option>
          <option value="Apparel - Sleepwear">Apparel - Sleepwear</option>
          <option value="Apparel Accessories">Apparel Accessories</option>
          <option value="Eyewear - Sunglasses, Frames and zero power eye glasses">Eyewear - Sunglasses, Frames and zero power eye glasses</option>
          <option value="Apparel - Other Products">Apparel - Other Products</option>
          <option value="Watches">Watches</option>
          <option value="Fashion Smartwatches">Fashion Smartwatches</option>
          <option value="Shoes">Shoes</option>
          <option value="Flip Flops, Fashion Sandals and Slippers">Flip Flops, Fashion Sandals and Slippers</option>
          <option value="Kids footwear">Kids footwear</option>
          <option value="Handbags">Handbags</option>
          <option value="Wallets">Wallets</option>
          <option value="Backpacks">Backpacks</option>
          <option value="Luggage - Suitcase and Trolleys">Luggage - Suitcase and Trolleys</option>
          <option value="Luggage - Travel Accessories">Luggage - Travel Accessories</option>
          <option value="Luggage (other subcategories)">Luggage (other subcategories)</option>
          <option value="Fashion Jewellery">Fashion Jewellery</option>
          <option value="Silver Jewellery">Silver Jewellery</option>
          <option value="Silver Coins and Bars">Silver Coins and Bars</option>
          <option value="Fine Jewellery (unstudded and solitaire)">Fine Jewellery (unstudded and solitaire)</option>
          <option value="Fine Jewellery (studded)">Fine Jewellery (studded)</option>
          <option value="Fine Jewellery (Gold Coins)">Fine Jewellery (Gold Coins)</option>
          <option value="Kitchen - Non-Appliances (including Glassware and Ceramicware)">Kitchen - Non-Appliances (including Glassware and Ceramicware)</option>
          <option value="Kitchen - Non-Appliances (including Glassware and Ceramicware)">Kitchen - Non-Appliances (including Glassware and Ceramicware)</option>
          <option value="Gas Stoves and Pressure Cookers">Gas Stoves and Pressure Cookers</option>
          <option value="Small Appliances">Small Appliances</option>
          <option value="Small Appliances">Small Appliances</option>
          <option value="Fans and Robotic Vacuums">Fans and Robotic Vacuums</option>
          <option value="Fans and Robotic Vacuums">Fans and Robotic Vacuums</option>
          <option value="Wall Art">Wall Art</option>
          <option value="Home Fragrance and Candles">Home Fragrance and Candles</option>
          <option value="Home furnishing">Home furnishing</option>
          <option value="Home furnishing">Home furnishing</option>
          <option value="Carpets, Bedsheets, Blankets and covers">Carpets, Bedsheets, Blankets and covers</option>
          <option value="Carpets, Bedsheets, Blankets and covers">Carpets, Bedsheets, Blankets and covers</option>
          <option value="Home Storage">Home Storage</option>
          <option value="Home Storage">Home Storage</option>
          <option value="Home - Other Subcategories (including Posters)">Home - Other Subcategories (including Posters)</option>
          <option value="Home - Waste & Recycling">Home - Waste & Recycling</option>
          <option value="Craft Materials">Craft Materials</option>
          <option value="Home improvement - Wallpapers">Home improvement - Wallpapers</option>
          <option value="Home improvement (excl. accessories), including Home Security Systems">Home improvement (excl. accessories), including Home Security Systems</option>
          <option value="Ladders, Kitchen and Bath fixtures">Ladders, Kitchen and Bath fixtures</option>
          <option value="LED Bulbs and Battens">LED Bulbs and Battens</option>
          <option value="Indoor Lighting - Others">Indoor Lighting - Others</option>
          <option value="Clocks">Clocks</option>
          <option value="Indoor Lighting - Wall, ceiling fixture lights, lamp bases, lamp shades and Smart Lighting">Indoor Lighting - Wall, ceiling fixture lights, lamp bases, lamp shades and Smart Lighting</option>
          <option value="Cushion Covers">Cushion Covers</option>
          <option value="Slipcovers and Kitchen Linens">Slipcovers and Kitchen Linens</option>
          <option value="Lawn & Garden - Commercial Agricultural Products">Lawn & Garden - Commercial Agricultural Products</option>
          <option value="Lawn & Garden - Solar Devices (Panels, Inverters, Charge controller, Battery, Lights, Solar gadgets)">Lawn & Garden - Solar Devices (Panels, Inverters, Charge controller, Battery, Lights, Solar gadgets)</option>
          <option value="Lawn & Garden - Chemical Pest Control, Mosquito Netts, Bird control, Plant protection, Foggers">Lawn & Garden - Chemical Pest Control, Mosquito Netts, Bird control, Plant protection, Foggers</option>
          <option value="Lawn & Garden - Chemical Pest Control, Mosquito Netts, Bird control, Plant protection, Foggers">Lawn & Garden - Chemical Pest Control, Mosquito Netts, Bird control, Plant protection, Foggers</option>
          <option value="Lawn & Garden - Chemical Pest Control, Mosquito Netts, Bird control, Plant protection, Foggers">Lawn & Garden - Chemical Pest Control, Mosquito Netts, Bird control, Plant protection, Foggers</option>
          <option value="Lawn & Garden - Outdoor equipments (Saws, Lawn Mowers, Cultivator, Tiller, String Trimmers, Water Pumps, Generators, Barbeque Grills, Greenhouses)">Lawn & Garden - Outdoor equipments (Saws, Lawn Mowers, Cultivator, Tiller, String Trimmers, Water Pumps, Generators, Barbeque Grills, Greenhouses)</option>
          <option value="Lawn and Garden - Planters, Fertilisers, Watering and other subcategories">Lawn and Garden - Planters, Fertilisers, Watering and other subcategories</option>
          <option value="Lawn and Garden - Plants, Seeds, Bulbs and gardening tools">Lawn and Garden - Plants, Seeds, Bulbs and gardening tools</option>
          <option value="Automotive - Other Subcategories">Automotive - Other Subcategories</option>
          <option value="Automotive - Tyres and Rims">Automotive - Tyres and Rims</option>
          <option value="Automotive - Helmets, Oils & Lubricants, Batteries, Pressure washer, Vacuum cleaner, Air Freshener, Air purifiers and Vehicle Tools">Automotive - Helmets, Oils & Lubricants, Batteries, Pressure washer, Vacuum cleaner, Air Freshener, Air purifiers and Vehicle Tools</option>
          <option value="Automotive Accessories - Floor Mats, Seat/Car/Bike Covers">Automotive Accessories - Floor Mats, Seat/Car/Bike Covers</option>
          <option value="Automotive Vehicles - 2-Wheelers, 4-Wheelers and Electric Vehicles">Automotive Vehicles - 2-Wheelers, 4-Wheelers and Electric Vehicles</option>
          <option value="Automotive - Car and Bike parts, Brakes, Styling and body fittings, Transmission, Engine parts, Exhaust systems, Interior fitting, Suspension and Wipers">Automotive - Car and Bike parts, Brakes, Styling and body fittings, Transmission, Engine parts, Exhaust systems, Interior fitting, Suspension and Wipers</option>
          <option value="Automotive - Cleaning kits (Sponges, Brush, Duster, Cloths and liquids), Car interior &amp; exterior care (Waxes, polish, Shampoo and other), Car and Bike Lighting and Paints">Automotive - Cleaning kits (Sponges, Brush, Duster, Cloths and liquids), Car interior &amp; exterior care (Waxes, polish, Shampoo and other), Car and Bike Lighting and Paints</option>
          <option value="Major Appliances Accessories">Major Appliances Accessories</option>
          <option value="Major Appliances - Chimneys">Major Appliances - Chimneys</option>
          <option value="Major Appliances (excluding Accessories, Refrigerators and Chimneys)">Major Appliances (excluding Accessories, Refrigerators and Chimneys)</option>
          <option value="Major Appliances - Refrigerators">Major Appliances - Refrigerators</option>
          <option value="Furniture">Furniture</option>
          <option value="Bean Bags and Inflatables">Bean Bags and Inflatables</option>
          <option value="Business and Industrial Supplies - Robotics, Lab supplies, Soldering equipment, Personal Protective equipment (excluding masks) and PPE kits">Business and Industrial Supplies - Robotics, Lab supplies, Soldering equipment, Personal Protective equipment (excluding masks) and PPE kits</option>
          <option value="Business and Industrial Supplies - Testing & Measuring instruments, Tapes & Adhesives, Packaging material, 3D printer, Thermal printer and Barcode scanner">Business and Industrial Supplies - Testing & Measuring instruments, Tapes & Adhesives, Packaging material, 3D printer, Thermal printer and Barcode scanner
          </option>
          <option value="Business and Industrial Supplies - Testing & Measuring instruments">Business and Industrial Supplies - Testing & Measuring instruments</option>
          <option value="Business and Industrial Supplies - Material Handling Equipment">Business and Industrial Supplies - Material Handling Equipment</option>
          <option value="Business and Industrial Supplies - Power tools & accessories">Business and Industrial Supplies - Power tools & accessories</option>
          <option value="Weighing Scales - BISS and Kitchen">Weighing Scales - BISS and Kitchen</option>
          <option value="Weighing Scales - BISS and Kitchen">Weighing Scales - BISS and Kitchen</option>
          <option value="Bicycles">Bicycles</option>
          <option value="Gym equipments">Gym equipments</option>
          <option value="Sports - Cricket and Badminton Equipments">Sports - Cricket and Badminton Equipments</option>
          <option value="Tennis">Tennis</option>
          <option value="Table Tennis">Table Tennis</option>
          <option value="Squash">Squash</option>
          <option value="Football">Football</option>
          <option value="Volleyball">Volleyball</option>
          <option value="Basketball">Basketball</option>
          <option value="Throwball">Throwball</option>
          <option value="Swimming">Swimming</option>
          <option value="Sports & Outdoors - Other Products">Sports & Outdoors - Other Products</option>
          <option value="Sports & Outdoors - Other Products">Sports & Outdoors - Other Products</option>
          <option value="Sports & Outdoors - Footwear">Sports & Outdoors - Footwear</option>
          <option value="Sports & Outdoors - Footwear">Sports & Outdoors - Footwear</option>
          <option value="Consumable Physical Gift Card">Consumable Physical Gift Card</option>
          <option value="Sports Collectibles">Sports Collectibles</option>
          <option value="Sports Collectibles">Sports Collectibles</option>
          <option value="Entertainment Collectibles">Entertainment Collectibles</option>
          <option value="Entertainment Collectibles">Entertainment Collectibles</option>
          <option value="Coins Collectibles">Coins Collectibles</option>
          <option value="Fine Art">Fine Art</option>
          <option value="Masks">Masks</option>
          <option value="Mobile Phones & Tablets (including Graphic Tablets)">Mobile Phones & Tablets (including Graphic Tablets)</option>
          <option value="Laptops">Laptops</option>
          <option value="Scanners and Printers">Scanners and Printers</option>
          <option value="PC Components (RAM, Motherboards)">PC Components (RAM, Motherboards)</option>
          <option value="Desktops">Desktops</option>
          <option value="Monitors">Monitors</option>
          <option value="Laptop & Camera Battery">Laptop & Camera Battery</option>
          <option value="Laptop Bags and Sleeves">Laptop Bags and Sleeves</option>
          <option value="Laptop Bags and Sleeves">Laptop Bags and Sleeves</option>
          <option value="USB Flash Drives (Pen Drives)">USB Flash Drives (Pen Drives)</option>
          <option value="Hard Disks">Hard Disks</option>
          <option value="Kindle Accessories">Kindle Accessories</option>
          <option value="Memory Cards">Memory Cards</option>
          <option value="Modems & Nettworking Devices">Modems & Nettworking Devices</option>
          <option value="Car Electronics Devices">Car Electronics Devices</option>
          <option value="Car Electronics Accessories">Car Electronics Accessories</option>
          <option value="Electronic Devices (except TV, Camera & Camcorder, Camera Lenses and Accessories, GPS Devices, Speakers)">Electronic Devices (except TV, Camera & Camcorder, Camera Lenses and Accessories, GPS Devices, Speakers)</option>
          <option value="Landline Phones">Landline Phones</option>
          <option value="Smart Watches and Accessories">Smart Watches and Accessories</option>
          <option value="Television">Television</option>
          <option value="Camera and Camcorder">Camera and Camcorder</option>
          <option value="Camera Lenses">Camera Lenses</option>
          <option value="Camera Accessories">Camera Accessories</option>
          <option value="GPS Devices">GPS Devices</option>
          <option value="Speakers">Speakers</option>
          <option value="Headsets, Headphones and Earphones">Headsets, Headphones and Earphones</option>
          <option value="Computer/Laptop - Keyboards and Mouse">Computer/Laptop - Keyboards and Mouse</option>
          <option value="Power Banks & Chargers">Power Banks & Chargers</option>
          <option value="Accessories - Electronics, PC and Wireless">Accessories - Electronics, PC and Wireless</option>
          <option value="Cases/Covers/Skins/Screen Guards">Cases/Covers/Skins/Screen Guards</option>
          <option value="Cases/Covers/Skins/Screen Guards">Cases/Covers/Skins/Screen Guards</option>
          <option value="Cases/Covers/Skins/Screen Guards">Cases/Covers/Skins/Screen Guards</option>
          <option value="Cases/Covers/Skins/Screen Guards">Cases/Covers/Skins/Screen Guards</option>
          <option value="Cables & Adapters - Electronics, PC, Wireless">Cables & Adapters - Electronics, PC, Wireless</option>
          <option value="Car Cradles, Lens Kits and Tablet Cases">Car Cradles, Lens Kits and Tablet Cases</option>
          <option value="Warranty Services">Warranty Services</option>
          <option value="Office products - Office supplies, stationery, Paper products, Art and craft supplies, Pens, Pencils & Writing Supplies">Office products - Office supplies, stationery, Paper products, Art and craft supplies, Pens, Pencils & Writing Supplies</option>
          <option value="Office Products - Machines & Electronic Devices">Office Products - Machines & Electronic Devices</option>
          <option value="Projectors, Home Theatre Systems, Binoculars and Telescopes">Projectors, Home Theatre Systems, Binoculars and Telescopes</option>
          <option value="Musical Instruments - Guitars">Musical Instruments - Guitars</option>
          <option value="Musical Instruments - Keyboards">Musical Instruments - Keyboards</option>
          <option value="Musical Instruments (excluding Guitars and Keyboards)">Musical Instruments (excluding Guitars and Keyboards)</option>
          <option value="Musical Instruments - DJ & VJ Equipment, Recording and Computer, Cables & Leads, Microphones, PA & Stage">Musical Instruments - DJ & VJ Equipment, Recording and Computer, Cables & Leads, Microphones, PA & Stage</option>
        </select>
        <select className='lineFive' id="tierUnit" name="tierUnit" value={formValues.tierUnit} onChange={handleChange}>
          <option value="basic">Basic</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>
      </div>
      <div className='label'>
        <label className='Shipping'> Select Shipping Options </label>
      </div>
      <div className='formFields'>
        <div>
          <input className='lineSeven'
            type="radio"
            name="shippingOption"
            value="Self Ship"
            checked={formValues.shippingOption === "Self Ship"}
            onChange={handleChange}
          />
          <label htmlFor="self-ship">Self ship</label>
        </div>
        <div>
          <input className='lineSeven'
            type="radio"
            name="shippingOption"
            value="Easy Ship"
            checked={formValues.shippingOption === "Easy Ship"}
            onChange={handleChange}
          />
          <label className="shipmentOptions" htmlFor='easyship'>Easyship</label>
        </div>
        <div>
          <input className='lineSeven'
            type="radio"
            name="shippingOption"
            value="FBA"
            checked={formValues.shippingOption === "FBA"}
            onChange={handleChange}
          />
          <label className="shipmentOptions" htmlFor='FBA'>FBA</label>
        </div>
        <div>
          <input className='lineSeven'
            type="radio"
            name="shippingOption"
            value="Seller Flex"
            checked={formValues.shippingOption === "Seller Flex"}
            onChange={handleChange}
          />
          <label htmlFor='sellerflex'>Seller Flex</label>
        </div>
      </div>
      {showAdditionalShippingCost ? (
        <div id='additionalShippingCost' className='additionalShippingCost'>
          <div className='label'>
            <label className=''> Additional Shipping Costs </label>
          </div>
          <div className='formFields'>
            <input className='lineSix'
             name="localShippingCost"
              type="number"
              placeholder="Local"
              value={formValues.localShippingCost}
              onChange={handleChange}
            />
            <input className='lineSix'
              name="regionalShippingCost"
              type="number"
              placeholder="Regional"
              value={formValues.regionalShippingCost}
              onChange={handleChange}
            />
            <input className='lineSix'
              name="nationalShippingCost"
              type="number"
              placeholder="National"
              value={formValues.nationalShippingCost}
              onChange={handleChange}
            />
          </div>
        </div>
      ):null}
      <button type="submit" className='submitButton'>Submit</button>
    </form>
    <div>
    {submitted && 
    <div className='tableWrapper'>
      <div>
      <table className="tableTwo">
  <thead className='tableHeader'>
    <tr className="tableTwoRow1">
      <th></th>
      <th>LOCAL</th>
      <th>REGIONAL</th>
      <th>NATIONAL</th>
    </tr>
  </thead>
  <tbody>
    <tr className="tableTwoRow2">
      <td>FINAL SHIPPING PRICE<br/>(Inclusive of additinal shipping charges)</td>
      <td>{formData.closing_fee_local}</td>
      <td>{formData.closing_fee_regional}</td>
      <td>{formData.closing_fee_national}</td>
      </tr>
      </tbody>
      </table>
      </div>
    <table className="tableTwo">
  <thead className='tableHeader'>
    <tr className="tableTwoRow1">
      <th>REGION/METRICS</th>
      <th>ITEM SELLING PRICE</th>
      <th>NETT SETTLEMENT</th>
      <th>PROFIT</th>
      <th>MARGIN ON SP</th>
      <th>MARGIN ON SETTLEMENT</th>
    </tr>
  </thead>
  <tbody>
    <tr className="tableTwoRow2">
      <td>LOCAL</td>
      <td>{formData.item_selling_price_local}</td>
      <td>{formData.Nett_Settlment_Local}</td>
      <td>{formData.Profit_local}</td>
      <td>{formData.Margin_on_sp_local}</td>
      <td>{formData.margin_on_settlement_local}</td>
     
    </tr>
    <tr className="tableTwoRow3">
      <td>REGIONAL</td>
      <td>{formData.item_selling_price_regional}</td>
      <td>{formData.Nett_Settlment_Regional}</td>
      <td>{formData.Profit_regional}</td>
      <td>{formData.Margin_on_sp_regional}</td>
      <td>{formData.margin_on_settlement_regional}</td>
      
    </tr>
    <tr className="tableTwoRow4">
      <td>NATIONAL</td>
      <td>{formData.item_selling_price_national}</td>
      <td>{formData.Nett_Settlment_National}</td>
      <td>{formData.Profit_national}</td>
      <td>{formData.Margin_on_sp_national}</td>
      <td>{formData.margin_on_settlement_national}</td>
    </tr>
  </tbody>
</table>
      <div>
      <table className="tableTwo">
  <thead className='tableHeader'>
  <tr className="tableTwoRow1">
      <th></th>
      <th>Profit</th>
      <th>Margin on Settlement</th>
      <th>Margin on SP</th>
    </tr>
  </thead>
  <tbody>
    <tr className="tableTwoRow2">
    <td>Average</td>
      <td>{formData.Average_profit}</td>
      <td>{formData.average_margin_on_settlement}</td>
      <td>{formData.Average_margin_on_sp}</td>
      </tr>
      </tbody>
      </table>
      </div>
</div>

}
    </div>
    </div>
  );
}

export default App;