import { Router, Request, Response } from 'express';
import { con, createAsset, getAllAssets, readAssetByID, updateAsset } from './app';

const router = Router();

// Add your CRUD API implementation here
router.post('/update', (req: Request, res: Response) => {
    console.log(req.body)
    if(req.body.ID && req.body.Name && req.body.Surname && (req.body.Grade1 || req.body.Grade2 || req.body.Grade3 || req.body.Grade4)){
        try {
            updateAsset(con, req.body.ID, req.body.Name, req.body.Surname, req.body?.Grade1??'false', req.body?.Grade2??'false', req.body?.Grade3??'false', req.body?.Grade4??'false')
            res.sendStatus(200);
        } catch (error) {
            res.status(500).send(error)
        }
    }else{
        res.sendStatus(403);
    }
});

router.post('/create', async (req: Request, res: Response) => {
    console.log(req.body)
    if(req.body.ID && req.body.Name && req.body.Surname){
        try {
            const success = await createAsset(con, req.body.ID, req.body.Name, req.body.Surname)
            success?res.sendStatus(200):res.sendStatus(500);
        } catch (error) {
            res.status(500).send(error)
        }
    }else{
        res.sendStatus(403);
    }
});

router.get('/', async (req: Request, res: Response) => {
    try{
        const result = await getAllAssets(con);
        res.json(result);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});
  
router.get('/:id', async (req: Request, res: Response) => {
    try{
        console.log('id: ' + req.params.id);
        const result = await readAssetByID(con, req.params.id);
        res.json(result);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

  
/*
    // Return all the current assets on the ledger.
    await getAllAssets(contract);

    // Create a new asset on the ledger.
    await createAsset(contract);

    // Update an existing asset asynchronously.
    await transferAssetAsync(contract);

    // Get the asset details by assetID.
    await readAssetByID(contract);

    // Update an asset which does not exist.
    await updateNonExistentAsset(contract)
*/
  
export default router;
