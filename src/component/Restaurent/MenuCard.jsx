import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material";
import React from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Category } from "@mui/icons-material";


const demo = [
  {
    Category: "Cheese",
    ingredient: ["Mozzarella", "armesan"]
  },
  {
    Category: "Vegetables",
    ingredient: ["Mushrooms"]
  }
]

const MenuCard = () => {

const handleCheckBoxChange=(value)=>{
  console.log("value")
}

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:gap-5">
            <img className="w-[7rem] h-[7rem] object-cover"
              src="https://images.pexels.com/photos/3682837/pexels-photo-3682837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="" />

            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              <p className="font-semibold text-xl">
                Pizza
              </p>
              <p>
                Rs.499
              </p>
              <p className="text-gray-400">
                Our pizza is a perfect blend of artisanal crust, fresh toppings, and rich, homemade sauces, baked to crispy perfection in a wood-fired oven.
              </p>
            </div>
          </div>

        </div>

      </AccordionSummary>
      <AccordionDetails>
        <form>
          <div className="flex gap-5 flex-wrap">
            {
              demo.map((item) =>(
                <div>
                  <p>{item.Category}</p>
                  <FormGroup>
                    {item.ingredient.map((item) => (<FormControlLabel control={<Checkbox onChange={()=>handleCheckBoxChange(item)}/>} label={item} />))}
                  </FormGroup>
                </div>
              ))}
          </div>
          <div className="pt-5">
            <Button variant="contained" type="submit" disabled={false}>
              {true?"Add to Cart":"Out Of Stock"}
            </Button>
          </div>

        </form>
      </AccordionDetails>
    </Accordion>
  )
}

export default MenuCard