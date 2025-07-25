import { Fragment } from "react";
import { filterOptions } from "../../config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({filter, handleFilter}) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>

      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div className="text-base font-bold" >
              <h3 className="capitalize">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label key={option.id} className="flex font-medium items-center gap-2 ">
                    <Checkbox className="border border-black" onCheckedChange={() => handleFilter(keyItem, option.id)} checked={
                      filter && Object.keys(filter).length > 0  &&
                      filter[keyItem] && filter[keyItem].indexOf(option.id) > -1
                    } />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator/>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
