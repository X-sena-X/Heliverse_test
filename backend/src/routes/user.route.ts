import { Router } from 'express';
import {
	createUser,
	deleteUser,
	filterByAvailability,
	filterByDomain,
	filterByGender,
	getUserById,
	getUsers,
	searchByName,
	updateUser,
} from '../controllers/user.controller';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/search', searchByName);
router.get('/filter-by-domain', filterByDomain);
router.get('/filter-by-gender', filterByGender);
router.get('/filter-by-availability', filterByAvailability);

export default router;
