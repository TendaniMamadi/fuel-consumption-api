

export default function FuelConsumptionAPI(fuelConsumption) {

    
    async function addVehicle(req, res) {
   
        const {description, regNumber} = req.body;
 
        const results  = await fuelConsumption.addVehicle({description, regNumber});

        res.render("index", {
            results
        });
    }

    async function vehicles(req, res) {

        const vehicle = await fuelConsumption.vehicles();

        res.render("show", {
            vehicle
        });
    }


    async function vehicle(req, res) {
        const {id} = req.query;
        const vehicle = await fuelConsumption.vehicle(id);
        res.render("trip",{
           
            data: vehicle
        });
    }

    async function refuel(req, res) {
        const { vehicleId, liters, amount, distance, filledUp } = req.body;
        console.log(req.body);
        const status = await fuelConsumption.refuel(vehicleId, liters, amount, distance, filledUp);
        res.render("trip",{
           data
        });
    }


    return {
        addVehicle,
        vehicle,
        vehicles,
        refuel
    }

}