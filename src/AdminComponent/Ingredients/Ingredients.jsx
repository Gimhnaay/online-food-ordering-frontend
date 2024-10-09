import { Grid } from "@mui/material";
import React from "react";
import IngredientTable from "./IngredientTable";

export const Ingredients = () => {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={8}>
                    <IngredientTable/>
                </Grid>
            </Grid>
        </div>
    )
}