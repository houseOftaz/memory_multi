
# Définition des models de données

Ces fichiers models sont utilisés pour interargir avec la bdd.
Chaque modèle représente une table dans ma bdd et contient des
fonction `CRUD` (Create, Read, Update, Delete) pour effectuer
des opérations sur ces tables.
Cela permet de centraliser la logique d'accès aux données et
de maintenir un code organisé et modulable.

Utilisation de Pomise: chaque fonction retourne une promesse,
ce qui permet d'utiliser `async/await` ailleur dans mon code.
Cela me permet de simplifier la gestion des erreurs et le flux
de contrôle.

faire usercontroller inscription
cette fonction prend en parametre les different champ d'un utilisateur
           