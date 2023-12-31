import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const createEvent = async (req, res) => {

    const { title, description, startDate, endDate, location, address, capacity, languages, imageUrl, category } = req.body;
    const foundCategory = await prisma.categories.findUnique({
        where: {
            label: category.label,
        },
    });
    console.log('Found category:', foundCategory);

    if (!foundCategory) {
        return res.status(404).json({ error: 'Category not found' });
    }
    
    try {
        const newEvent = await prisma.events.create({
            data: {
                title,
                description,
                startDate,
                endDate,
                location,
                address,
                capacity,
                languages,
                imageUrl,
                categoryId: foundCategory.id,
            }
        });
        console.log(req.body);
        res.json({ message: 'Event created successfully', newEvent });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAllEvents = async (req, res) => {
    try {
        const events = await prisma.events.findMany();
        res.json(events);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await prisma.events.findUnique({
            where: {
                id
            }
        });
        res.json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const searchEvents = async (req, res) => {
    const {category, startDate, endDate, location } = req.query;

    try {
        let events;
        const where = {};

        if (category) {
            where.category = {
                label: {
                    equals: category,
                },
            };
        }
        
        if(startDate && endDate) {
            where.startDate = {
                gte: new Date(startDate),
            };
            where.endDate = {
                lte: new Date(endDate),
            };
        };
        
        if(location) {
            where.location = {
                contains: location,
            };
        };

        events = await prisma.events.findMany({
            where,
        });

        if (events.length === 0) {
            return res.status(404).json({ error: 'No events match the specified criteria.' });
        }

        res.json(events);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, startDate, endDate, location, type, capacity, languages, imageUrl, category } = req.body;
    try {

        const event = await prisma.events.findUnique({
            where: {
                id
            }
        });

        if (!event) {
            return res.status(400).json({ error: 'Event not found' });
        } else {
            await prisma.events.update({
                where: {
                    id
                },
                data: {
                    title,
                    description,
                    startDate,
                    endDate,
                    location,
                    type,
                    capacity,
                    languages,
                    imageUrl,
                    category,
                }
            });
            res.json({ message: 'Event updated successfully', event });
        }
      
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEvent = await prisma.events.findUnique({
            where: {
                id
            }
        });

        if (!deletedEvent) {
            return res.status(400).json({ error: 'Event not found' });
        } else {
            await prisma.events.delete({
                where: {
                    id
                }
            });
        }

        res.json({ message: 'Event deleted successfully', deletedEvent });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export {
    getAllEvents,
    getEventById,
    searchEvents,
    createEvent,
    updateEvent,
    deleteEvent
}